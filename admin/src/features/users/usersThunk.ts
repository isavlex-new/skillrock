// Base URL for the API
import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from '../../utils/apiClient';
import {IUser } from "./types.ts";

const API_URL = '/users';

// Async Thunks for fetching and creating users
// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await apiClient.get(API_URL);
    return response.data;
});

// Fetch specific user
export const fetchUser = createAsyncThunk('users/fetchUser', async (userId: IUser["_id"]) => {
    const response = await apiClient.get(`${API_URL}/${userId}`);
    return response.data;
});

// Add a new user
export const addUser = createAsyncThunk('users/addUser', async (newUser: Omit<IUser, '_id'>) => {
    const response = await apiClient.post(API_URL, newUser);
    return response.data;
});

// Update a user
export const updateUser = createAsyncThunk('users/updateUser', async (user : IUser) => {
    const { _id, ...props } = user;
    const response = await apiClient.put(`${API_URL}/${_id}`, props);
    return response.data;
});

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: IUser["_id"]) => {
    await apiClient.delete(`${API_URL}/${userId}`);
    return userId;
});
