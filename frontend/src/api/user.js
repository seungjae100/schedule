import client from "./client";
import {getRefreshToken, removeTokens, setTokens} from "../utils/token";

export const login = async (loginData) =>  {
    try {
        const response = await client.post('/users/login', loginData);
        const { accessToken, refreshToken } = response.data;

        // 토큰 저장
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        const response = await client.post('/users/token', null, {
            headers: {
                'Refresh-Token': refreshToken
            }
        });
        const { accessToken } = response.data;
        setTokens(accessToken, refreshToken); // 새 엑서스 토큰 저장, 리프레시 토큰 저장
        return response.data;
    } catch (error) {
        removeTokens(); // 토큰 갱신 실패시 모든 토큰 제거
        throw error;
    }
}

export const logout = () => {
    removeTokens();
    window.location.href = '/';
};

export const signup = async (signupData) => {
    try {
        const response = await client.post('/users/signup', signupData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 로그인한 사용자 정보 가져오기
export const getCurrentUser = async () => {
    try {
        const response = await client.get('/users/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 사용자 정보 수정
export const updateUser = async (updateData) => {
    try {
        const response = await client.put('/users/me', updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 사용자 정보 삭제
export const deleteUser = async () => {
    try {
        const response = await client.delete('users/me');
        sessionStorage.clear();
        localStorage.clear();
        return response.data;
    } catch (error) {
        throw error;
    }
};