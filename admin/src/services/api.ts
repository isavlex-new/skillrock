import axios from 'axios';
import {Credentials} from "../features/auth/types.ts";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

const login = (credentials: Credentials) => api.post('/auth/login', credentials);

export default {
    login,
};
