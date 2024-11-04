import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from "./usersThunk";
import {UserState} from "./types.ts";

const initialState: UserState = {
    user: null,
    status: 'idle', // 'idle' | 'fetching' | 'fetched' | 'failed'
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'fetching';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
    }
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
