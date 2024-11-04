import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';
import { IDeleteTopicQuestion, IQuestion, ITopic } from './types';

const API_URL = '/topics'


export const fetchTopic = createAsyncThunk('topic/fetchTopic', async (topicId : ITopic['_id']) => {
    const response = await apiClient.get(`${API_URL}/${topicId}`);
    return response.data;
});


export const addTopicQuestion = createAsyncThunk('topic/addQuestion', async (question : Omit<IQuestion, '_id'>) => {
    const response = await apiClient.post('/questions', question);
    return response.data;
});

export const updateTopicQuestion = createAsyncThunk('topic/updateQuestion', async (question: IQuestion) => {
    const { _id, ...props } = question;
    const response = await apiClient.put(`/questions/${_id}`, props);
    return response.data;
});

export const deleteTopicQuestion = createAsyncThunk('topic/removeQuestion', async ({questionId, topicId} : IDeleteTopicQuestion) => {
    await apiClient.delete(`/questions/${questionId}`);
    return questionId;
});