import { useEffect } from 'react';
import { fetchUsers, addUser } from '../../features/users/usersThunk';
import { Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Link } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedStore";
import UsersTableActions from '../../components/User/UsersTableActions';
import UserForm from '../../components/User/UserForm';
import { IUser, IUserWithRole } from '../../features/users/types';
import { useToggle } from '../../hooks/useToggle';


const Users = () => {

    const [createUserMenuOpen, toggleCreateUserMenu] = useToggle();
    
    const dispatch = useAppDispatch();

    const { users, status, creatingStatus, creatingError } = useAppSelector((state) => state.users);

    const columns : GridColDef<IUserWithRole>[] = [
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 250 },
        { field: 'role', headerName: 'Role', width: 250, renderCell: (params) => params.row.role.name },
        { field: 'username', headerName: 'Username', width: 250, renderCell: (params) => (
           <Link href={`/dashboard/users/${params.row._id}`}>{params.row.username}</Link>
        ) 
        },
        {
            field: 'actions', 
            headerName: 'actions', 
            width: 250, 
            renderCell: (params) => <UsersTableActions user={params.row} />
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    const handleCreateUser = (user : Omit<IUser, '_id'>) => {
        dispatch(addUser(user));
    }

    useEffect(() => {
       if (status === 'idle') {
         dispatch(fetchUsers());
       }
    }, [status, dispatch]);
    
    return (
        <div>
            <div className='usersTitle'>
                <h1>Users List</h1>
                <Button onClick={toggleCreateUserMenu} variant="contained">Create New User</Button>
                <Dialog open={createUserMenuOpen} onClose={toggleCreateUserMenu}>
                <DialogTitle>Create new user</DialogTitle>
                <DialogContent>
                <UserForm
                 onSubmit={handleCreateUser}
                 status={creatingStatus}
                 error={creatingError}
                 type="create"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleCreateUserMenu}>Cancel</Button>
                </DialogActions>
                </Dialog>
            </div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );};

export default Users;
