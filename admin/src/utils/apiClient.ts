import axios from 'axios';
import {store} from "../app/store";
import { logoutUser } from '../features/auth/authThunk';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5050/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const apiUtil = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5050/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//if token is invalid
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
             if (!error.response._isRetry) {
                const config = error.config;
                config._isRetry = true;
                const response = await apiUtil.get('/auth/refresh');
                if (response.status !== 200) {
                    store.dispatch(logoutUser());
                } else {
                    const { accessToken } = response.data;
                    localStorage.setItem('token', accessToken);
                    return apiClient(config);
                }
             }
        }
        return Promise.reject(error);
    }
);
export default apiClient;
