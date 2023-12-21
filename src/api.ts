import axios, { AxiosError } from "axios"
import router from "./router"
import config from "./config"
import { getJWTToken } from "./utils/jwt";

export const api = axios.create({
    baseURL: config.baseUrl,
})

api.interceptors.request.use(
    (config) => {
        const access_token = getJWTToken();
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err instanceof AxiosError) {
            if (err.response && err.response.status == 401) {
                router.push({
                    path: '/login'
                })
            }
            return Promise.reject(err);
        } else {
            return Promise.reject(err);
        }
    }
);