import axios, { AxiosError } from "axios"
import router from "./router"
export const ACCESS_TOKEN_STORAGE_KEY = "access_token"

const config = {
  baseUrl: 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
}

export const api = axios.create({
  baseURL: config.baseUrl,
})

// Axios interceptor to include JWT in request headers
api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
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

export default config