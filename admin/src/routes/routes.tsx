import { RouteObject } from 'react-router-dom';
// routes.js
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from "../pages/NotFound";
import Users from "../pages/users/Users";
import Courses from "../pages/courses/Courses";
import Course from "../pages/courses/Course";
import Permissions from "../pages/permissions/Permissions";
import Module from '../pages/modules/Module';
import Topic from '../pages/topics/Topic';
import Blog from '../pages/blog/Blog';
import { createBrowserRouter } from 'react-router-dom';

const routes : RouteObject[] = [
    {
        path: '/',
        element: <ProtectedRoute component={Dashboard} />,
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/blog',
        Component: Blog,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute component={Dashboard} />,
        children: [
            // {
            //     path: 'blog',
            //     Component: Blog,
            // },
            {
                path: 'users',
                Component: Users,
            },
            {
               path: 'courses',
               Component: Courses
            },
            {
               path: 'courses/:courseId',
               Component: Course
            },
            {
                path: 'permissions',
                Component: Permissions
            },
            {
                path: 'modules/:moduleId',
                Component: Module
            },
            {
                path: 'topics/:topicId',
                Component: Topic
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }
]

export default createBrowserRouter(routes);
