import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { deleteTopicQuestion, updateTopicQuestion } from '../../features/topics/topicThunk';
import { Box, Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateQuestionForm from './CreateQuestionForm';
import Confirm from '../Confirm';
import { toast } from 'sonner';
import { IQuestion } from '../../features/topics/types';

interface IQuestionTableActionsProps {
    question: IQuestion;
}


const QuestionTableActions : FC<IQuestionTableActionsProps> = ({question}) => {
    
    const [updateQuestionMenuOpen, toggleUpdateQuestionMenu] = useToggle();

    const [removeQuestionMenuOpen, toggleRemoveQuestionMenu] = useToggle();
    
    const dispatch = useAppDispatch();

    const { updatingStatus, updatingError } = useAppSelector(state => state.topic);

    const handleUpdateQuestion = (updatedQuestion : IQuestion) => {
        toast.promise(dispatch(updateTopicQuestion(updatedQuestion)), {
            loading: 'Trying to update question...',
            error: ({error}) => `Error: ${error.message}`,
            success: 'Question has been updated sucessfully!'
        });
    }

    const handleDeleteQuestion = () => {
       toast.promise(dispatch(deleteTopicQuestion({questionId: question._id, topicId: question.topic})), {
            loading: 'Trying to delete question...',
            error: ({error}) => `Error: ${error.message}`,
            success: 'Question has been deleted sucessfully!'
        }); 
    }
    
    
    return (
        <>
        <Confirm 
         open={removeQuestionMenuOpen} 
         onClose={toggleRemoveQuestionMenu} 
         onConfirm={handleDeleteQuestion}
         text="Are you sure you want to delete this question?" 
         />
        <Dialog open={updateQuestionMenuOpen} onClose={toggleUpdateQuestionMenu}>
        <DialogTitle>Update question</DialogTitle>
        <DialogContent>
        <CreateQuestionForm
         topicId={question.topic}
         initial={question} 
         status={updatingStatus} 
         error={updatingError}
         onSubmit={handleUpdateQuestion}
         type="update" 
         />
        </DialogContent>
        <DialogActions>
        <Button onClick={toggleUpdateQuestionMenu} sx={{fontWeight: '600'}}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box display="flex" component="div" alignItems="center" gap="15px" sx={{p: 1}}>
        <Button size="small" onClick={toggleUpdateQuestionMenu} variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        <Button size="small" onClick={toggleRemoveQuestionMenu} variant="contained" startIcon={<DeleteIcon />}>Remove</Button>
        </Box>
        </>
    )
}

export default QuestionTableActions;