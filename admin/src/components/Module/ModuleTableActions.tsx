import { FC } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { removeCourseModule, updateCourseModule } from '../../features/courses/coursesThunk';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Confirm from '../Confirm';
import { toast } from 'sonner';
import { IModule } from '../../features/modules/types';
import CreateModuleForm from './CreateModuleForm';

interface IModuleTableActionsProps {
    module: IModule;
}

const ModuleTableActions : FC<IModuleTableActionsProps> = ({module}) => {

    const [removeModuleMenuOpen, toggleRemoveModuleMenu] = useToggle();

    const [updateModuleMenuOpen, toggleUpdateModuleMenu] = useToggle();
     
    const dispatch = useAppDispatch();

    const { updatingStatus, updatingError } = useAppSelector(state => state.course);

    const handleRemoveModule = () => {
        toast.promise(dispatch(removeCourseModule({moduleId: module._id, courseId: module.course})), {
            loading: 'Trying to remove module...',
            success: 'Module has been successfully removed!',
            error: ({error}) => `Error: ${error.message}`
        })
    }

    const handleUpdateModule = (module: IModule) => {
        toast.promise(dispatch(updateCourseModule(module)), {
            loading: 'Trying to update module...',
            success: 'Module has been successfully updated!',
            error: ({error}) => `Error: ${error.message}`
        });
    }

    return (
        <>
        <Confirm 
         open={removeModuleMenuOpen}
         onClose={toggleRemoveModuleMenu}
         onConfirm={handleRemoveModule}
         text="Are you sure you want to delete this module?"
        />
        <Dialog open={updateModuleMenuOpen} onClose={toggleUpdateModuleMenu}>
        <DialogTitle>Update a module</DialogTitle>
        <DialogContent>
         <CreateModuleForm 
          courseId={module.course}
          initial={module}
          onSubmit={handleUpdateModule}
          status={updatingStatus}
          error={updatingError}
          type="update"
          />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleUpdateModuleMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box display="flex" component="div" alignItems="center" gap="15px" sx={{p: 1}}>
        <Button size="small" onClick={toggleUpdateModuleMenu} variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        <Button size="small" onClick={toggleRemoveModuleMenu} variant="contained" startIcon={<DeleteIcon />}>Remove</Button>
        </Box>
        </>
    )
}

export default ModuleTableActions;