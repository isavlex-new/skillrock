import { memo, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedStore";
import { useToggle } from "../../hooks/useToggle";
import { deleteUser, updateUser } from "../../features/users/usersThunk";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Confirm from "../Confirm";
import { toast } from 'sonner';
import { IUserWithRole, IUser } from "../../features/users/types";
import UserForm from "./UserForm";


interface IUsersTableActionsProps {
    user: IUserWithRole;
}


const UsersTableActions : FC<IUsersTableActionsProps> = ({user}) => {

    const [removeUserMenuOpen, toggleRemoveUserMenu] = useToggle();

    const [updateUserMenuOpen, toggleUpdateUserMenu] = useToggle();
    
    const dispatch = useAppDispatch();

    const { updatingStatus, updatingError } = useAppSelector(state => state.users);

    const handleUpdateUser = (user: IUser) => {
        toast.promise(dispatch(updateUser(user)), {
            loading: 'Trying to update user...',
            success: 'User has been successfully updated',
            error: ({error}) => `Error: ${error.message}`
        })
    }

    const handleRemoveUser = () => {
        toast.promise(dispatch(deleteUser(user._id)), {
            loading: 'Trying to delete user...',
            success: 'User has been successfully removed',
            error: ({error}) => `Error: ${error.message}`
        })
    };

    return (
        <>
        <Confirm
         open={removeUserMenuOpen}
         onClose={toggleRemoveUserMenu}
         onConfirm={handleRemoveUser}
         text="Are you sure you want to delete this user?"
        />
        <Dialog open={updateUserMenuOpen} onClose={toggleUpdateUserMenu}>
        <DialogTitle>Update user</DialogTitle>
        <DialogContent>
            <UserForm 
             initial={user}
             status={updatingStatus}
             error={updatingError}
             onSubmit={handleUpdateUser}
             type="update"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={toggleUpdateUserMenu}>Cancel</Button>
        </DialogActions>
        </Dialog>
        <Box display="flex" component="div" alignItems="center" gap="15px" sx={{p: 1}}>
        <Button onClick={toggleUpdateUserMenu} size="small" variant="outlined" startIcon={<EditIcon />}>Edit</Button>
        <Button onClick={handleRemoveUser} size="small" variant="contained" startIcon={<DeleteIcon />}>Remove</Button>
        </Box>
        </>
    )
}

export default memo(UsersTableActions);