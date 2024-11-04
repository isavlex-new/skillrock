import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { addTopicQuestion } from '../../features/topics/topicThunk';
import { Typography, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import QuestionTableActions from './QuestionTableActions';
import CreateQuestionForm from './CreateQuestionForm';
import { IQuestion } from '../../features/topics/types';

interface IQuestionsProps {
    questions: IQuestion[];
}

const Questions : FC<IQuestionsProps> = ({questions}) => {
    
    const { topicId } = useParams();

    const [createQuestionMenuOpen, toggleCreateQuestionMenu] = useToggle();

    const dispatch = useAppDispatch();

    const { creatingStatus, creatingError } = useAppSelector(state => state.topic);

    const columns : GridColDef<IQuestion>[] = [
        { field: 'text', headerName: 'Text', width: 300 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'explanation', headerName: 'Explanation', width: 250 },
        { field: 'difficulty', headerName: 'Difficulty', width: 100 }, 
        { field: 'options', headerName: 'Options', width: 100, renderCell: ({row}) => row.options.length },
        { field: 'actions', headerName: 'Actions', width: 250, renderCell: ({row}) => <QuestionTableActions question={row} /> }
    ];

    const handleCreateQuestion = (question: Omit<IQuestion, '_id'>) => {
        dispatch(addTopicQuestion(question));
    }

    return (
        <Box>
        <Dialog open={createQuestionMenuOpen} onClose={toggleCreateQuestionMenu}>
        <DialogTitle>Create a new question</DialogTitle>
        <DialogContent>
        <CreateQuestionForm 
         topicId={topicId as string}
         status={creatingStatus}
         error={creatingError}
         onSubmit={handleCreateQuestion}
         type="create"
         />
        </DialogContent>
        <DialogActions>
        <Button sx={{fontWeight: '600'}} onClick={toggleCreateQuestionMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box>
        <Typography variant='h4' sx={{marginBottom: 2}}>Questions list</Typography>
        <Button onClick={toggleCreateQuestionMenu} variant="contained">Create new question</Button>
        </Box>
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid 
        columns={columns}
        rows={questions}
        getRowId={(question) => question._id}
        initialState={{pagination: {paginationModel: {page: 0, pageSize: 5}}}}
        pageSizeOptions={[5, 10]}
        />
        </Paper>
        </Box>
    )
}

export default Questions;