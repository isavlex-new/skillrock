import { useAppDispatch, useAppSelector } from './useTypedStore';
import { useEffect } from 'react';
import { fetchCourses } from '../features/courses/coursesThunk';

export function useFetchCourses() {
  
   const { courses, status, error } = useAppSelector(state => state.courses);

   const dispatch = useAppDispatch();

   useEffect(() => {
     if (status === 'idle') {
        dispatch(fetchCourses());
     }
   }, [status, dispatch]);

   return { courses, status, error };

}