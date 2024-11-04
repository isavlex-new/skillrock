import { createSlice } from '@reduxjs/toolkit';
import {fetchPermissions} from "./permissionsThunk";
import {PermissionsState} from "./types.ts";

const initialState: PermissionsState = {
    permissions: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    creatingStatus: 'idle',
    creatingError: null,
    updatingError: null,
    updatingStatus: 'idle'
}

const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        addOrUpdatePermission: (state, action) => {
            const permission = action.payload;
            const index = state.permissions.findIndex(({ _id }) => permission._id === _id);

            if (index !== -1) {
                // Update the existing permission
                state.permissions[index] = { ...state.permissions[index], ...permission };
            } else {
                // Add new permission
                state.permissions.push(permission);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => {
                state.status = 'fetching';
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.permissions = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? null;
            })
    }
});

export const { addOrUpdatePermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;
