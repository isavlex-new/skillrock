import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from '../../utils/apiClient';
import { IModule, IRemoveModuleTopic } from "./types";
import { ITopic } from "../topics/types";


const API_URL = '/modules';

export const fetchModule = createAsyncThunk('module/fetchModule', async (moduleId : IModule['_id']) => {
     const response = await apiClient.get(`${API_URL}/${moduleId}`);
     return response.data;
});


export const removeModuleTopic = createAsyncThunk('module/removeTopic', async ({moduleId, topicId} : IRemoveModuleTopic) => {
    await apiClient.delete(`/topics/${topicId}`);
    return topicId;
});

export const addModuleTopic = createAsyncThunk('module/addTopic', async (topic : Omit<ITopic, '_id'>) => {
    const response = await apiClient.post('/topics', topic);
    return response.data;
})

export const updateModuleTopic = createAsyncThunk('topic/updateTopic', async (topic : ITopic) => {
    const { _id, ...props } = topic;
    const response = await apiClient.put(`${API_URL}/${_id}`, props);
    return response.data;
});