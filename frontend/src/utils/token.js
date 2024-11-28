let memoryAccessToken = null; // access 토큰은 메로리에 저장

export const setTokens = (accessToken, refreshToken) => {
    memoryAccessToken = accessToken; // accessToken 메모리에 저장
    localStorage.setItem('refreshToken', refreshToken) // refresh 토큰은 로컬스토리지에 저장
};

export const getAccessToken = () => {
    return memoryAccessToken;
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const removeTokens = () => {
    memoryAccessToken = null;
    localStorage.removeItem('refreshToken');
};