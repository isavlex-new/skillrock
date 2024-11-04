import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCourse, addCourseModule, removeCourseModule, updateCourseModule } from "./coursesThunk";
import { ICourseState, ICourseWithModulesWithInstructors } from "./types";
import { IModule } from "../modules/types";

const initialState : ICourseState = {
    course: null,
    status: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed'
    error: null,
    updatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed'
    updatingError: null,
    creatingStatus: 'idle', // 'idle' | 'fetching' | 'succeeded' | 'failed'
    creatingError: null
}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetState: () => initialState,
        resetAddModuleState: (state) => {
           state.creatingError = null;
           state.creatingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCourse.pending, (state) => {
            state.status = 'fetching';
        })
        .addCase(fetchCourse.fulfilled, (state, action : PayloadAction<ICourseWithModulesWithInstructors>) => {
            state.status = 'succeeded';
            state.course = action.payload;
        })
        .addCase(fetchCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
        })
        .addCase(addCourseModule.pending, (state) => {
            state.creatingStatus = 'fetching';
        })
        .addCase(addCourseModule.fulfilled, (state, action : PayloadAction<IModule>) => {
            state.course?.modules.push(action.payload);
            state.creatingStatus = 'succeeded';
        })
        .addCase(addCourseModule.rejected, (state, action) => {
            state.creatingError = action.error.message ?? null;
            state.creatingStatus = 'failed';
        })
        .addCase(updateCourseModule.pending, (state) => {
            state.updatingStatus = 'fetching';
        })
        .addCase(updateCourseModule.fulfilled, (state, action : PayloadAction<IModule>) => {
            state.updatingStatus = 'succeeded';
            if (state.course) {
                const moduleIndex = state.course.modules.findIndex(m => m._id === action.payload._id);
                if (moduleIndex > -1) {
                    state.course.modules[moduleIndex] = action.payload;
                }
            }
        })
        .addCase(updateCourseModule.rejected, (state, action) => {
            state.updatingError = action.error.message ?? null;
            state.updatingStatus = 'failed';
        })
        .addCase(removeCourseModule.fulfilled, (state, action : PayloadAction<IModule['_id']>) => {
            if (state.course) {
                state.course.modules = state.course.modules.filter(module => module._id !== action.payload);
            }
        })
    }
});

export const { resetState } = courseSlice.actions;
export default courseSlice.reducer;