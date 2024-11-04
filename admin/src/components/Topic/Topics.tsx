import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { addModuleTopic } from '../../features/modules/modulesThunk';
import { Typography, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TopicTableActions from './TopicTableActions';
import CreateTopicForm from './CreateTopicForm';
import { ITopic } from '../../features/topics/types';

interface ITopicsProps {
    topics: ITopic[];
}

const Topics : FC<ITopicsProps> = ({topics}) => {

    const dispatch = useAppDispatch();

    const { creatingStatus, creatingError } = useAppSelector(state => state.module);
    
    const { moduleId } = useParams();

    const [createTopicMenuOpen, toggleCreateTopicMenu] = useToggle();

    const columns : GridColDef<ITopic>[] = [
        {field: 'title', headerName: 'Title', width: 250, renderCell: ({row}) => {
            return <Link href={`/dashboard/topics/${row._id}`}>{row.title}</Link>
        }},
        {field: 'content', headerName: 'Content', width: 300},
        {field: 'actions', headerName: 'Actions', width: 250, renderCell: ({row}) => <TopicTableActions topic={row}/>}
      ];

    const handleCreateTopic = (topic: Omit<ITopic, '_id'>) => {
        dispatch(addModuleTopic(topic));
    }

    return (
        <Box>
        <Dialog open={createTopicMenuOpen} onClose={toggleCreateTopicMenu}>
        <DialogTitle>Create a new topic</DialogTitle>
        <DialogContent>
        <CreateTopicForm 
         moduleId={moduleId as string} 
         type='create'
         onSubmit={handleCreateTopic}
         status={creatingStatus}
         error={creatingError}
         />
        </DialogContent>
        <DialogActions>
        <Button sx={{fontWeight: '600'}} onClick={toggleCreateTopicMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box>
        <Typography variant='h4' sx={{marginBottom: 2}}>Topics list</Typography>
        <Button onClick={toggleCreateTopicMenu} variant="contained">Create new topic</Button>
        </Box>
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid 
        columns={columns}
        rows={topics}
        getRowId={(topic) => topic._id}
        initialState={{pagination: {paginationModel: {page: 0, pageSize: 5}}}}
        pageSizeOptions={[5, 10]}
        />
        </Paper>
        </Box>
    )
}

export default Topics;