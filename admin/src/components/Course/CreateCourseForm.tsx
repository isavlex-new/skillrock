import { useState, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useTypedStore';
import { resetCreatingState, resetUpdatingState } from '../../features/courses/coursesSlice';
import { useFetchUsers } from '../../hooks/useFetchUsers';
import { TextField, MenuItem, Button, Alert} from '@mui/material';
import { ICourse, ICourseWithInstructor } from '../../features/courses/types';
import { THUNK_ERROR, THUNK_STATUS } from '../../types/redux.types';

interface IBaseCourseForm {
    status: THUNK_STATUS;
    error: THUNK_ERROR;
}

interface ICreateCourse extends IBaseCourseForm {
    initial?: Omit<ICourseWithInstructor, '_id'>
    type: 'create';
    onSubmit: (course: Omit<ICourse, '_id'>) => void;
}

interface IUpdateCourse extends IBaseCourseForm {
    initial: ICourseWithInstructor;
    type: 'update';
    onSubmit: (course: ICourse) => void;
}

type CreateCourseFormProps = ICreateCourse | IUpdateCourse;

const initialState = (course: ICourseWithInstructor | null | Omit<ICourseWithInstructor, '_id'>) : ICourse | Omit<ICourse, '_id'> => {
    if (course) {
        return {...course, instructor: course.instructor._id}
    }
    return { title: '', description: '', modules: [], students: '', instructor: '' }
}

const getButtonLabel = (status: THUNK_STATUS, type: 'create' | 'update') => {
    if (status === 'fetching') {
        return 'Loading...';
    }
    return type === 'update' ? 'Update course' : 'Create course';
}

const CreateCourseForm : FC<CreateCourseFormProps> = ({initial = null, onSubmit, type, status, error}) => {

    const dispatch = useAppDispatch();

    const { users } = useFetchUsers();

    const [courseData, setCourseData] = useState(initialState(initial));

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'create') {
            onSubmit(courseData as Omit<ICourse, '_id'>)
            setCourseData(initialState(initial));
        } else {
            onSubmit(courseData as ICourse);
        }
    };

    useEffect(() => {
      return () => {
        if (type === 'create') {
            dispatch(resetCreatingState());
        } else {
            dispatch(resetUpdatingState());
        }
      }
    }, [type, dispatch]);

    return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    select
                    label="Instructor"
                    name="instructor"
                    value={courseData.instructor}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                >
                {
                    users.map(({_id, first_name, last_name}) => <MenuItem key={_id} value={_id}>
                    {`${first_name} ${last_name}`}
                    </MenuItem>)
                }
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    {getButtonLabel(status, type)}
                </Button>
                {
                    error && <Alert severity='error' sx={{marginTop: 2}}>{error}</Alert>
                }
            </form>
    );
};

export default CreateCourseForm;
