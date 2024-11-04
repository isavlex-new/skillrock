import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {  fetchUsers, addUser, updateUser, deleteUser } from "./usersThunk";
import { IUser, IUserWithRole, UsersState } from "./types.ts";

interface UsersWithPagination {
    users: IUserWithRole[];
    totalPages: number;
    currentPage: number;
}

const initialState: UsersState = {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    updatingStatus: 'idle',
    updatingError: null,
    creatingError: null,
    creatingStatus: 'idle'
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addOrUpdateUser: (state, action) => {
            const user = action.payload;
            const index = state.users.findIndex(({ _id }) => user._id === _id);

            if (index !== -1) {
                // Update the existing user
                state.users[index] = { ...state.users[index], ...user };
            } else {
                // Add new user
                state.users.push(user);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'fetching';
            })
            .addCase(fetchUsers.fulfilled, (state, action : PayloadAction<UsersWithPagination>) => {
                state.status = 'succeeded';
                state.users = action.payload.users;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(addUser.pending, (state) => {
                state.creatingStatus = 'fetching';
            })
            .addCase(addUser.fulfilled, (state, action : PayloadAction<IUserWithRole>) => {
                state.creatingStatus = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.creatingStatus = 'failed';
                state.creatingError = action.error.message ?? null;
            })
            .addCase(updateUser.pending, (state) => {
                state.updatingStatus = 'fetching';
            })
            .addCase(updateUser.fulfilled, (state, action : PayloadAction<IUserWithRole>) => {
                state.updatingStatus = 'succeeded';
                const userIndex = state.users.findIndex(u => u._id === action.payload._id);
                if (userIndex > -1) {
                    state.users[userIndex] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updatingStatus= 'failed';
                state.creatingError = action.error.message ?? null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<IUser['_id']>) => {
                state.users = state.users.filter(u => u._id !== action.payload);
            })
    }
});

export const { addOrUpdateUser } = usersSlice.actions;
export default usersSlice.reducer;
