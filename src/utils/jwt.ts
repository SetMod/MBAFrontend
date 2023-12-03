import { ACCESS_TOKEN_STORAGE_KEY } from "../config";

export const setJWTToken = (access_token: string) => {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access_token);
}

export const getJWTToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}

export const removeJWTToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
}
