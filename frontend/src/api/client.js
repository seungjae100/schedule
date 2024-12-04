import axios from 'axios';
import { getAccessToken, removeTokens } from "../utils/token";

const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: "true"
});

client.interceptors.request.use((config) => {
    const token = getAccessToken();
    console.log('Current token:', token); // 토큰이 있는지 확인

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (!window.location.pathname.includes('/users/login')) {
                removeTokens();
                window.location.href = '/users/login';
            }
        }
        return Promise.reject(error);
    }
);

export default client;