import axios from 'axios';
import {getAccessToken, getRefreshToken, removeTokens, setTokens} from "../utils/token";

const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// 요청 인터셉터
client.interceptors.request.use((config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
        config.headers['Refresh-Token'] = refreshToken;
    }
    return config;
});

// 응답 인터셉터
client.interceptors.response.use(
    (response) => {
        // 새로운 엑서스 토큰이 있으면 저장
        const newAccessToken = response.headers['new-access-token'];
        if (newAccessToken) {
            sessionStorage.setItem('accessToken', newAccessToken);
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 엑서스 토큰이 만료되어 403 에러가 발생한 경우
        if ([401, 403].includes(error.response?.status) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 현재 가지고 있는 리프레시 토큰으로 새로은 엑서스 토큰 요청
                const response = await client.post('/users/token', null, {
                    headers: {
                        'Refresh-Token': getRefreshToken()
                    }
                });

                const {accessToken} = response.data;
                setTokens(accessToken, getRefreshToken());
                return client(originalRequest);
            } catch (refreshError) {
                // 토큰 생신 실패 시
                removeTokens();
                window.location.href = '/users/login';
                return Promise.reject(refreshError);
            }
        }

        // 다른 에러의 경우
        if (error.response?.status === 401) {
            removeTokens();
            window.location.href = '/users/login';
        }

        return Promise.reject(error);
    }
);

export default client;