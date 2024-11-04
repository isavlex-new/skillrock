import { useEffect, FC } from 'react';
import { useToggle } from '../../hooks/useToggle.ts';
import { Button, Paper, Link, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchCourses, addCourse } from "../../features/courses/coursesThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedStore.ts";
import { ICourse, ICourseWithInstructor } from '../../features/courses/types.ts';
import CreateCourseForm from '../../components/Course/CreateCourseForm.tsx';
import './Courses.scss';
import CourseTableActions from '../../components/Course/CourseTableActions.tsx';

const Courses : FC = () => {

    const [createCourseMenuOpen, toggleCreateCourseMenu] = useToggle();

    const dispatch = useAppDispatch();

    const { courses, status, creatingStatus, creatingError } = useAppSelector(state => state.courses);

    const columns : GridColDef<ICourseWithInstructor>[] = [
        { field: 'title', headerName: 'Title', width: 130, renderCell: ({row}) => {
            return <Link href={`/dashboard/courses/${row._id}`}>{row.title}</Link>
        }},
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'modules', headerName: 'Modules', width: 150, renderCell: ({row}) => row.modules.length },
        { field: 'instructor', headerName: 'Instructor', width: 150, renderCell: ({row}) => {
            const { _id, first_name, last_name } = row.instructor;
            return <Link href={`/dashboard/users/${_id}`}>{`${first_name} ${last_name}`}</Link>
        }},
        { field: 'students', headerName: 'students', width: 150 },
        { field: 'actions', headerName: 'Actions', width: 250, renderCell: ({row}) => <CourseTableActions course={row} /> }
    ];

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCourses());
        }
    }, [status, dispatch]);

    const handleCreateCourse = (course: Omit<ICourse, '_id'>) => {
       dispatch(addCourse(course));
    }
    

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <div className='coursesTitle'>
                <h1>Courses List</h1>
                <Button onClick={toggleCreateCourseMenu} variant="contained">Create New Course</Button>
                <Dialog open={createCourseMenuOpen} onClose={toggleCreateCourseMenu}>
                <DialogTitle>Create new course</DialogTitle>
                <DialogContent>
                    <CreateCourseForm 
                     onSubmit={handleCreateCourse}
                     type="create"
                     status={creatingStatus}
                     error={creatingError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleCreateCourseMenu}>Cancel</Button>
                </DialogActions>
                </Dialog>
            </div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
};

export default Courses;
