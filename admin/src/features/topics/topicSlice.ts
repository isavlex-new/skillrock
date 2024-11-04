import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchTopic, addTopicQuestion, updateTopicQuestion, deleteTopicQuestion } from './topicThunk';
import { IQuestion, ITopicState, ITopicWithQuestions } from './types';

const initialState : ITopicState = {
    topic: null,
    status: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    error: null,
    updatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    updatingError: null,
    creatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed',
    creatingError: null,
}

const topicSlice = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        resetState: () => initialState,
        resetCreateQuestionState: (state) => {
            state.creatingError = null;
            state.creatingStatus = 'idle';
        },
        resetUpdateQuestionState: (state) => {
            state.updatingError = null;
            state.updatingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTopic.pending, (state) => {
            state.status = 'fetching';
        })
        .addCase(fetchTopic.fulfilled, (state, action : PayloadAction<ITopicWithQuestions>) => {
            state.topic = action.payload;
            state.status = 'succeeded';
        })
        .addCase(fetchTopic.rejected, (state, action) => {
            state.error = action.error.message ?? null;
            state.status = 'failed';
        })
        .addCase(addTopicQuestion.pending, (state) => {
            state.creatingStatus = 'fetching';
        })
        .addCase(addTopicQuestion.fulfilled, (state, action : PayloadAction<IQuestion>) => {
            state.topic?.questions.push(action.payload);
            state.creatingStatus = 'succeeded';
        })
        .addCase(addTopicQuestion.rejected, (state, action) => {
            state.creatingError = action.error.message ?? null;
            state.creatingStatus = 'failed';
        })
        .addCase(updateTopicQuestion.pending, (state) => {
            state.updatingStatus = 'fetching';
        })
        .addCase(updateTopicQuestion.fulfilled, (state, action : PayloadAction<IQuestion>) => {
            if (state.topic) {
            const questionIndex = state.topic.questions.findIndex(q => q._id === action.payload._id);
            if (questionIndex > - 1) {
                state.topic.questions[questionIndex] = action.payload;
            }
            state.updatingStatus = 'succeeded';
            }
        })
        .addCase(updateTopicQuestion.rejected, (state, action) => {
            state.updatingError = action.error.message ?? null;
            state.updatingStatus = 'failed';
        })
        .addCase(deleteTopicQuestion.fulfilled, (state, action : PayloadAction<IQuestion['_id']>) => {
            if (state.topic) {
                const topicQuestions = state.topic.questions.filter(question => question._id !== action.payload);
                state.topic.questions = topicQuestions;
            }
        })
    }
});

export const { resetState, resetCreateQuestionState, resetUpdateQuestionState } = topicSlice.actions;
export default topicSlice.reducer;