
export const setTokens = (accessToken, refreshToken) => {
     sessionStorage.setItem('accessToken', accessToken); // access토큰은 세션스토리지에 저장
    localStorage.setItem('refreshToken', refreshToken) // refresh 토큰은 로컬스토리지에 저장
};

export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const isAuthenticated = () => {
    return !! sessionStorage.getItem('accessToken') && !! localStorage.getItem('refreshToken');
}

export const removeTokens = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};