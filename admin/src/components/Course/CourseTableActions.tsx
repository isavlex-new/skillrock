import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { deleteCourse, updateCourse } from '../../features/courses/coursesThunk';
import { Box, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Confirm from '../Confirm';
import CreateCourseForm from './CreateCourseForm';
import { toast } from 'sonner';
import { ICourse, ICourseWithInstructor } from '../../features/courses/types';

interface ICourseTableActionsProps {
    course: ICourseWithInstructor;
}

const CourseTableActions : FC<ICourseTableActionsProps> = ({course}) => {

    const [removeCourseMenuOpen, toggleRemoveCourseOpen] = useToggle();

    const [updateCourseMenuOpen, toggleUpdateCourseMenu] = useToggle();

    const dispatch = useAppDispatch();
    
    const { updatingStatus, updatingError } = useAppSelector(state => state.courses);

    const handleUpdateCourse = (updatingCourse : ICourse) => {
        toast.promise(dispatch(updateCourse(updatingCourse)), {
            loading: 'Trying to update course...',
            error: ({error}) => `Error: ${error.message}`,
            success: 'Course has been successfully updated!'
        });
    }

    const handleRemoveCourse = () => {
        toast.promise(dispatch(deleteCourse(course._id)), {
            loading: 'Trying to remove course...',
            error: ({error}) => `Error: ${error.message}`,
            success: 'Course has been successfully removed!'
        });
    }

    return (
       <>
        <Confirm 
         open={removeCourseMenuOpen} 
         onClose={toggleRemoveCourseOpen} 
         onConfirm={handleRemoveCourse}
         text="Are you sure you want to delete this course?" 
        />
        <Dialog open={updateCourseMenuOpen} onClose={toggleUpdateCourseMenu}>
        <DialogTitle>Update course</DialogTitle>
        <DialogContent>
        <CreateCourseForm 
         initial={course}
         onSubmit={handleUpdateCourse}
         status={updatingStatus}
         error={updatingError}
         type="update"
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleUpdateCourseMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box display="flex" component="div" alignItems="center" gap="15px" sx={{p: 1}}>
        <Button onClick={toggleUpdateCourseMenu} size="small" variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        <Button onClick={toggleRemoveCourseOpen} size="small" variant="contained" startIcon={<DeleteIcon />}>Remove</Button>
        </Box>
       </>
    )
}

export default CourseTableActions;