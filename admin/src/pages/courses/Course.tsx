import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedStore.ts";
import { fetchCourse } from '../../features/courses/coursesThunk.ts';
import PageStateProvider from '../../UI/PageStateProvider.tsx';
import CourseLoader from '../../UI/CourseLoader.tsx';
import CourseForm from '../../components/Course/CourseForm.tsx';
import { ICourseWithModulesWithInstructors } from '../../features/courses/types.ts';
import { Container } from '@mui/material';


const Course : FC = () => {

    const { courseId } = useParams();
    
    const dispatch = useAppDispatch();

    const { course, status, error } = useAppSelector(state => state.course);

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchCourse(courseId as string))
      }
    }, [courseId, status, dispatch]);

    return (
        <Container maxWidth="lg">
        <PageStateProvider 
         loading={{state: status === 'fetching', component: <CourseLoader />}}
         error={{state: status === 'failed', component: <h1>{error}</h1>}}
         success={{state: status === 'succeeded', component: <CourseForm currentCurse={course as ICourseWithModulesWithInstructors}/>}}
        />
        </Container>
    );
};

export default Course;
