import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from '../../utils/apiClient';

const API_URL = '/roles';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
     const response = await apiClient.get(API_URL);
     return response.data;
});