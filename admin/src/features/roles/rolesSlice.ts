import { createSlice } from "@reduxjs/toolkit";
import { fetchRoles } from "./rolesThunk";
import { IRolesState } from "./types";


const initialState : IRolesState = {
    roles: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    creatingError: null,
    creatingStatus: 'idle',
    updatingError: null,
    updatingStatus: 'idle'
}

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRoles.pending, (state) => {
            state.status = 'fetching'; 
        })
        .addCase(fetchRoles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.roles = action.payload;
        })
        .addCase(fetchRoles.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })
    }
});

export const { resetState } = rolesSlice.actions;
export default rolesSlice.reducer;

