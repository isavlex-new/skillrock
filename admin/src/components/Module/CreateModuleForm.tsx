import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { THUNK_ERROR, THUNK_STATUS } from '../../types/redux.types';
import { IModule } from '../../features/modules/types';


interface IBaseCreateModuleForm {
    status: THUNK_STATUS;
    error: THUNK_ERROR;
    courseId: IModule['course'];
}

interface ICreateModule extends IBaseCreateModuleForm {
    initial?: Omit<IModule, '_id'>;
    type: 'create';
    onSubmit: (module: Omit<IModule, '_id'>) => void;
}

interface IUpdateModule extends IBaseCreateModuleForm {
    initial: IModule;
    type: 'update';
    onSubmit: (module: IModule) => void;
}

type CreateModuleFormProps = ICreateModule | IUpdateModule;

const initialState = (module: IModule | Omit<IModule, '_id'> | null, courseId: IModule['course']) : IModule | Omit<IModule, '_id'> => {
    if (module) {
        return module;
    }
    return {title: '', content: '', course: courseId, topics: []};
}

const getLabelText = (status : THUNK_STATUS, type: CreateModuleFormProps['type']) : string => {
    if (status === 'fetching') {
        return 'Loading...';
    }
    return type === 'create' ? 'Create' : 'Update';
}

const CreateModuleForm : FC<CreateModuleFormProps> = ({courseId, initial = null, onSubmit, status, error, type}) => {

    const [module, setModule] = useState(initialState(initial, courseId));

    const handleChangeModule = (e: ChangeEvent<HTMLInputElement>) => {
        setModule(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmitModuleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'create') {
            onSubmit(module as Omit<IModule, '_id'>);
            setModule(initialState(initial, courseId));
        } else {
            onSubmit(module as IModule);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmitModuleForm}>
        <TextField
        fullWidth
        name='title'
        value={module.title}
        onChange={handleChangeModule}
        label="Title"
        required
        margin="normal"
        />
        <TextField
        fullWidth
        name='content'
        value={module.content}
        onChange={handleChangeModule}
        label="Content"
        required
        margin="normal"
        />
        <Button 
        fullWidth 
        variant="contained" 
        disabled={status === 'fetching'} 
        type='submit'
        sx={{marginTop: 2}}
        >
        {getLabelText(status, type)}
        </Button>
        { error && <Alert severity="error">{error}</Alert> }
        </Box>
    )
}

export default CreateModuleForm;
