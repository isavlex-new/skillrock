import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addModuleTopic, removeModuleTopic, updateModuleTopic, fetchModule } from './modulesThunk';
import { IModuleState, IModuleWithTopics } from './types';
import { ITopic } from '../topics/types';


const initialState : IModuleState = {
    module: null,
    status: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    error: null,
    updatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    updatingError: null,
    creatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    creatingError: null
}

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        resetState: () => initialState,
        resetCreateTopicState: (state) => {
           state.creatingError = null;
           state.creatingStatus = 'idle';
        },
        resetUpdateTopicState: (state) => {
            state.updatingError = null;
            state.updatingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchModule.pending, (state) => {
            state.status = 'fetching';
        })
        .addCase(fetchModule.fulfilled, (state, action : PayloadAction<IModuleWithTopics>) => {
            state.status = 'succeeded';
            state.module = action.payload;
        })
        .addCase(fetchModule.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })
        .addCase(addModuleTopic.pending, (state) => {
            state.creatingStatus = 'fetching';
        })
        .addCase(addModuleTopic.fulfilled, (state, action : PayloadAction<ITopic>) => {
            state.creatingStatus = 'succeeded';
            state.module?.topics.push(action.payload);
        })
        .addCase(addModuleTopic.rejected, (state, action) => {
            state.creatingStatus = 'failed';
            state.creatingError = action.error.message ?? null;
        })
        .addCase(updateModuleTopic.pending, (state) => {
            state.updatingStatus = 'fetching';
        })
        .addCase(updateModuleTopic.fulfilled, (state, action : PayloadAction<ITopic>) => {
            state.updatingStatus = 'succeeded';
            if (state.module) {
                const topicIndex = state.module.topics.findIndex(t => t._id === action.payload._id);
                if (topicIndex > -1) {
                    state.module.topics[topicIndex] = action.payload;
                }
            }
        })
        .addCase(updateModuleTopic.rejected, (state, action) => {
            state.updatingStatus = 'failed';
            state.updatingError = action.error.message ?? null;
        })
        .addCase(removeModuleTopic.fulfilled, (state, action : PayloadAction<ITopic['_id']>) => {
            if (state.module) {
                state.module.topics = state.module.topics.filter(topic => topic._id !== action.payload);
            }
        })
    }
});

export const { resetState, resetCreateTopicState, resetUpdateTopicState } = moduleSlice.actions;
export default moduleSlice.reducer;