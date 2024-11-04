import { FC } from 'react';
import { Divider, Typography } from '@mui/material';
import CourseFormHeader from "./CourseFormHeader";
import Modules from '../Module/Modules';
import { ICourseWithModulesWithInstructors } from '../../features/courses/types';

interface ICourseFormProps {
   currentCurse: ICourseWithModulesWithInstructors;
}

const CourseForm : FC<ICourseFormProps> = ({currentCurse}) => {
    return (
       <>
       <Typography variant='h4' sx={{marginBottom: 2}}>Current course: {currentCurse.title}</Typography>
       <CourseFormHeader course={currentCurse} />
       <Divider sx={{marginTop: 4, marginBottom: 4}} />
       <Modules modules={currentCurse.modules} />
       </>
    )
}

export default CourseForm;