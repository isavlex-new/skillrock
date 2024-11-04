import { FC } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { stringAvatar } from '../../utils/stringAvatar';
import { ICourseWithModulesWithInstructors } from '../../features/courses/types';

interface ICourseFormHeaderProps {
    course: ICourseWithModulesWithInstructors;
}

const CourseFormHeader : FC<ICourseFormHeaderProps> = ({course}) => {

    const { instructor } = course;

    return (
        <>
        <Box display="flex" justifyContent="space-between" gap="40px" marginTop={4}>
        <Box display="flex" flexDirection="column" gap={2} flex="1 1 auto" maxWidth={400}>
        <Typography variant="h2" sx={{fontSize: '20px'}} gutterBottom>Course information</Typography>
         <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Title:</Typography>
         <Typography variant="body1">{course.title}</Typography>
         </Box>
         <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Description:</Typography>
         <Typography variant="body1">{course.description}</Typography>
         </Box>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column" gap="15px">
        <Typography variant="h2" sx={{fontSize: '20px'}} gutterBottom>Instructor</Typography>
        {   
            instructor.avatar
            ? <Avatar src={instructor.avatar} sx={{width: 150, height: 150}} />
            : <Avatar {...stringAvatar(`${instructor.first_name} ${instructor.last_name}`, 150, 150, '40px')} />
        }
        <Box alignSelf="flex-start">
         <Typography variant='body2' fontWeight="bold" marginBottom={1}>Firts name:</Typography>
         <Typography variant='body2'>{instructor.first_name}</Typography>  
        </Box>
        <Box alignSelf="flex-start">
         <Typography variant='body2' fontWeight="bold" marginBottom={1}>Last name:</Typography>
         <Typography variant='body2'>{instructor.last_name}</Typography>  
        </Box>
        <Box alignSelf="flex-start">
         <Typography variant='body2' fontWeight="bold" marginBottom={1}>Username:</Typography>
         <Typography variant='body2'>{instructor.username}</Typography>  
        </Box>
        </Box>
        </Box>
        </>
    )
}

export default CourseFormHeader;