import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCourse, deleteCourse, fetchCourses, updateCourse } from "./coursesThunk";
import { ICoursesState, ICourseWithInstructor } from "./types.ts";

const initialState: ICoursesState = {
    courses: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    updatingStatus: 'idle',
    updatingError: null,
    creatingStatus: 'idle',
    creatingError: null
}

const coursesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetCreatingState: (state) => {
            state.creatingError = null;
            state.creatingStatus = 'idle';
        },
        resetUpdatingState: (state) => {
            state.updatingError = null;
            state.updatingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchCourses.pending, (state, _) => {
               state.status = 'fetching';
           })
           .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<ICourseWithInstructor[]> ) => {
               state.status = 'succeeded';
               state.courses = action.payload;
           })
           .addCase(fetchCourses.rejected, (state, action) => {
               state.status = 'failed';
               state.error = action.error.message ?? null;
           })
           .addCase(updateCourse.pending, (state, _) => {
               state.updatingStatus = 'fetching';
           })
           .addCase(updateCourse.fulfilled, (state, action : PayloadAction<ICourseWithInstructor>) => {
               state.updatingStatus = 'succeeded';
               if (state.courses.length) {
                  const courseIndex = state.courses.findIndex(c => c._id === action.payload._id);
                  if (courseIndex > -1) {
                     state.courses[courseIndex] = action.payload;
                  }
               }
           })
           .addCase(updateCourse.rejected, (state, action) => {
                 state.updatingStatus = 'failed';
                 state.updatingError = action.error.message ?? null;
           })
           .addCase(addCourse.pending, (state, _) => {
              state.creatingStatus = 'fetching';
           })
           .addCase(addCourse.fulfilled, (state, action : PayloadAction<ICourseWithInstructor>) => {
              state.creatingStatus = 'succeeded';
              state.courses.push(action.payload);
           })
           .addCase(addCourse.rejected, (state, action) => {
              state.creatingStatus = 'failed';
              state.creatingError = action.error.message ?? null;
           })
           .addCase(deleteCourse.fulfilled, (state, action : PayloadAction<ICourseWithInstructor['_id']>) => {
              state.courses = state.courses.filter(c => c._id !== action.payload);
           })
    }
});

export const { resetCreatingState, resetUpdatingState } = coursesSlice.actions;
export default coursesSlice.reducer;
