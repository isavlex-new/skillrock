import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from "../features/dashboard/dashboardSlice";
import coursesReducer from "../features/courses/coursesSlice";
import courseReducer from "../features/courses/courseSlice";
import permissionsReducer from "../features/permissions/permissionsSlice";
import permissionReducer from "../features/permissions/permissionSlice";
import usersReducer from "../features/users/usersSlice";
import userReducer from "../features/users/userSlice";
import rolesReducer from "../features/roles/rolesSlice";
import moduleReducer from "../features/modules/moduleSlice";
import topicReducer from "../features/topics/topicSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    courses: coursesReducer,
    course: courseReducer,
    permissions: permissionsReducer,
    permission: permissionReducer,
    users: usersReducer,
    user: userReducer,
    roles: rolesReducer,
    module: moduleReducer,
    topic: topicReducer
});

export default rootReducer;
