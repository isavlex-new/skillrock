import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { removeModuleTopic, updateModuleTopic } from "../../features/modules/modulesThunk";
import { Button, Box, Dialog, DialogActions, DialogTitle, DialogContent } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Confirm from '../Confirm';
import { toast } from 'sonner';
import { ITopic } from '../../features/topics/types';
import CreateTopicForm from './CreateTopicForm';

interface ITopicTableActionsProps {
    topic: ITopic;
}

const TopicTableActions : FC<ITopicTableActionsProps> = ({topic}) => {

    const [removeTopicMenuOpen, toggleRemoveTopicMenu] = useToggle();

    const [updateTopicMenuOpen, toggleUpdateTopicMenu] = useToggle();

    const dispatch = useAppDispatch();

    const { updatingStatus, updatingError } = useAppSelector(state => state.module);

    const handleRemoveTopic = () => {
        toast.promise(dispatch(removeModuleTopic({moduleId: topic.module, topicId: topic._id})), {
            loading: 'Trying to remove topic...',
            error: ({error}) => `Error: ${error.message}`,
            success: 'Topic has been successfully removed!'
        });
    }

    const handleUpdateTopic = (topic : ITopic) => {
        toast.promise(dispatch(updateModuleTopic(topic)), {
            loading: 'Trying to update topic...',
            error: ({error} : any) => `Error: ${error.message}`,
            success: 'Topic has been successfully updated!'
        });
    }

    return (
        <>
        <Confirm 
         open={removeTopicMenuOpen}
         onClose={toggleRemoveTopicMenu}
         onConfirm={handleRemoveTopic}
         text="Are you sure you want to delete this topic?"
        />
        <Dialog open={updateTopicMenuOpen} onClose={toggleUpdateTopicMenu}>
        <DialogTitle>Update topic</DialogTitle>
        <DialogContent>
        <CreateTopicForm 
         moduleId={topic.module}
         initial={topic}
         status={updatingStatus}
         error={updatingError}
         type="update"
         onSubmit={handleUpdateTopic}
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleUpdateTopicMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box display="flex" component="div" alignItems="center" gap="15px" sx={{p: 1}}>
        <Button size="small" onClick={toggleUpdateTopicMenu} variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        <Button size="small" onClick={toggleRemoveTopicMenu} variant="contained" startIcon={<DeleteIcon />}>Remove</Button>
        </Box>
        </>
    )
}

export default TopicTableActions;
