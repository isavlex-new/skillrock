import apiClient from '../../utils/apiClient';
import {Credentials} from "./types.ts";

const AuthService = {
    login: async (credentials: Credentials) => {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return response.data.user;
        }
        throw new Error('Login failed');
    },
    logout: async () => {
        await apiClient.post('/auth/logout');
        return 'success';
    }
};

export default AuthService;
