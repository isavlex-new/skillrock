// Base URL for the API
import {createAsyncThunk} from "@reduxjs/toolkit";
import apiClient from '../../utils/apiClient';
import { ICourse, IRemoveModulePayload } from "./types.ts";
import { IModule } from "../modules/types.ts";

const API_URL = '/courses';

// Async thunks for CRUD operations

// Fetch all courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await apiClient.get(API_URL);
    return response.data;
});

// Fetch specific course
export const fetchCourse = createAsyncThunk('courses/fetchCourse', async (courseId: ICourse["_id"]) => {
    const response = await apiClient.get(`${API_URL}/${courseId}`);
    return response.data;
});

// Add a new course
export const addCourse = createAsyncThunk('courses/addCourse', async (newCourse: Omit<ICourse, '_id'>) => {
    const response = await apiClient.post(API_URL, newCourse);
    return response.data;
});

// Update a course
export const updateCourse = createAsyncThunk('courses/updateCourse', async (updatedCourse: ICourse) => {
    const { _id, ...data } = updatedCourse;
    const response = await apiClient.put(`${API_URL}/${_id}`, data);
    return response.data;
});

// Delete a course
export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId: ICourse["_id"]) => {
    await apiClient.delete(`${API_URL}/${courseId}`);
    return courseId;
});

export const addCourseModule = createAsyncThunk('courses/addModule', async (module : Omit<IModule, '_id'>) => {
    const response = await apiClient.post('/modules', module);
    return response.data;
});

export const updateCourseModule = createAsyncThunk('courses/updateModule', async (module: IModule) => {
    const { _id, ...props } = module;
    const response = await apiClient.put(`/modules/${_id}`, props);
    return response.data;
});

export const removeCourseModule = createAsyncThunk('courses/removeModule', async ({courseId, moduleId} : IRemoveModulePayload) => {
     await apiClient.delete(`/modules/${moduleId}`);
     return moduleId;
})
