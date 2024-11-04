import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { addCourseModule } from '../../features/courses/coursesThunk';
import { Typography, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ModuleTableActions from './ModuleTableActions';
import CreateModuleForm from './CreateModuleForm';
import { IModule } from '../../features/modules/types';


interface IModulesProps {
  modules: IModule[];
}

const Modules : FC<IModulesProps> = ({modules}) => {

    const dispatch = useAppDispatch();

    const { creatingStatus, creatingError } = useAppSelector(state => state.course);

    const { courseId } = useParams();
    
    const [createModuleFormOpen, toggleCreateModuleMenu] = useToggle();

    const columns : GridColDef<IModule>[] = [
      {field: 'title', headerName: 'Title', width: 250, renderCell: ({row}) => {
        return <Link href={`/dashboard/modules/${row._id}`}>{row.title}</Link>;
      }},
      {field: 'content', headerName: 'Content', width: 300},
      {field: 'actions', headerName: 'Actions', width: 250, renderCell: ({row}) => <ModuleTableActions module={row} />}
    ];

    const handleCreateModule = (module: Omit<IModule, '_id'>) => {
       dispatch(addCourseModule(module));
    }

    return (
        <Box>
        <Dialog open={createModuleFormOpen} onClose={toggleCreateModuleMenu}>
        <DialogTitle>Create a new module</DialogTitle>
        <DialogContent>
        <CreateModuleForm 
         courseId={courseId as string}
         type='create'
         onSubmit={handleCreateModule}
         status={creatingStatus}
         error={creatingError}
         />
        </DialogContent>
        <DialogActions>
        <Button sx={{fontWeight: '600'}} onClick={toggleCreateModuleMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box>
        <Typography variant='h4' sx={{marginBottom: 2}}>Modules list</Typography>
        <Button onClick={toggleCreateModuleMenu} variant="contained">Create new module</Button>
        </Box>
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid 
        columns={columns}
        rows={modules}
        getRowId={(row) => row._id}
        initialState={{pagination: {paginationModel: {page: 0, pageSize: 5}}}}
        pageSizeOptions={[5, 10]}
        />
        </Paper>
        </Box>
    )
}

export default Modules;