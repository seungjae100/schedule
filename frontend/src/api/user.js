import client from "./client";
import {removeTokens, setTokens} from "../utils/token";

export const login = async (loginData) =>  {
    try {
        const response = await client.post('/users/login', loginData);
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    removeTokens();
};

export const signup = async (signupData) => {
    try {
        const response = await client.post('/users/signup', signupData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await client.get('/users/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (updateData) => {
    try {
        const response = await client.put('/users/me', updateData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async () => {
    try {
        const response = await client.delete('users/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};