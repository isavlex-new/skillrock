import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';
import AuthService from './authService';
import {AppDispatch} from "../../app/store.ts";
import {Credentials} from "./types.ts";


    export const login = (credentials: Credentials) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
        const user = await AuthService.login(credentials);
        dispatch(loginSuccess(user));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(loginFailure(error.message));
        }
    }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Optionally verify token or fetch user data
        dispatch(loginSuccess(null));
    } else {
        dispatch(logout());
    }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
    await AuthService.logout()
    dispatch(logout());
}
