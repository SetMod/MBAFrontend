import axios from "axios"

export const accessTokenKey = "access_token"

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
    const access_token = localStorage.getItem(accessTokenKey);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default config