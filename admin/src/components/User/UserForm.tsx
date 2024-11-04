import { useState, useEffect, FC, FormEvent, ChangeEvent } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedStore";
import { fetchRoles } from "../../features/roles/rolesThunk";
import { TextField, Button, Box, MenuItem} from "@mui/material";
import { getDateFormat } from '../../utils/getDateFormat';
import { IUserWithRole, IUser } from "../../features/users/types";
import { THUNK_ERROR, THUNK_STATUS } from "../../types/redux.types";

type SubmitHandler<T> = T extends { type: 'update' }
? IUser
: Omit<IUser, '_id'>

interface IBaseUserForm {
    status: THUNK_STATUS;
    error: THUNK_ERROR;
}

interface ICreateUserForm extends IBaseUserForm {
      initial?: IUserWithRole;
      type: 'create';
      onSubmit: (user: SubmitHandler<ICreateUserForm>) => void;
}

interface IUpdateUserForm extends IBaseUserForm {
    initial: IUserWithRole;
    type: 'update';
    onSubmit: (user: SubmitHandler<IUpdateUserForm>) => void;
}

type UserFormProps = ICreateUserForm | IUpdateUserForm;

const initialState = (initial : IUserWithRole | null) : IUser | Omit<IUser, '_id'> => {
    return initial 
    ? {...initial, role: initial.role._id, birthday: getDateFormat(new Date(initial.birthday))}
    : {
        first_name: '',
        last_name: '',
        avatar: '',
        birthday: getDateFormat(new Date()),
        username: '',
        password: '',
        role: ''
    }
}

const UserForm : FC<UserFormProps> = ({initial = null, onSubmit, error, status, type}) => {


    const getButtonLabelText = () => {
        if (status === 'fetching') {
            return 'Loading...';
        }
        return type === 'create' ? 'Create' : 'Update';
    }

    const { roles, status: rolesStatus } = useAppSelector(state => state.roles);

    const [user, setUser] = useState<IUser | Omit<IUser, '_id'>>(initialState(initial));

    const dispatch = useAppDispatch();

    const handleChangeUserFields = (field : string) => {
        return (e : ChangeEvent<HTMLInputElement>) => setUser(prev => ({...prev, [field]: e.target.value}));
    }

    const handleSumbitForm = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'create') {
            onSubmit(user as Omit<IUser, '_id'>);
            setUser(initialState(initial));
        } else {
            onSubmit(user as IUser);
        }
    }

    useEffect(() => {
        if (rolesStatus === 'idle') {
          dispatch(fetchRoles());
        }
      }, [rolesStatus, dispatch]);

    return (
        <Box component="form" onSubmit={handleSumbitForm}>
        <TextField 
        fullWidth 
        name="first_name" 
        label="First name" 
        value={user.first_name}
        onChange={handleChangeUserFields('first_name')}
        variant="outlined"
        type="text"
        required
        margin="normal"
        />
        <TextField 
        fullWidth  
        name="last_name" 
        label="Last name" 
        value={user.last_name}
        onChange={handleChangeUserFields('last_name')}
        variant="outlined"
        type="text"
        required
        margin="normal"
        />
        <TextField 
        fullWidth  
        name="username" 
        label="Username" 
        value={user.username}
        onChange={handleChangeUserFields('username')}
        variant="outlined"
        type="text"
        required
        margin="normal"
        />
       <TextField 
        fullWidth  
        name="password" 
        label="password" 
        value={user.username}
        onChange={handleChangeUserFields('password')}
        variant="outlined"
        type="password"
        required
        margin="normal"
        />
        <TextField 
        type="date"
        variant="outlined"
        label="birthday"
        value={user.birthday}
        onChange={handleChangeUserFields('birthday')}
        required
        margin="normal"
        />
        <TextField value={user.role || ''} onChange={handleChangeUserFields('role')} select label="User role" variant="outlined" margin="normal" fullWidth>
        {
         roles.map(role => <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>)
        }
       </TextField>
        <Button
        disabled={status === 'fetching'} 
        type="submit" 
        variant="contained" 
        style={{alignSelf: 'flex-start'}}
        fullWidth
        >
         {getButtonLabelText()}
        </Button>
        {
         error && <p style={{color: 'red'}}>{error}</p>
        }
        </Box>
    )
}


export default UserForm;