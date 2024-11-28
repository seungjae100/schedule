import axios from 'axios';
import { getAccessToken, removeTokens } from "../utils/token";

const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            removeTokens();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default client;