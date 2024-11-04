import { useState, useEffect, type FC, type FormEvent, type ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useTypedStore';
import { resetCreateTopicState, resetUpdateTopicState } from '../../features/modules/moduleSlice';
import { Box, TextField, Button, Alert } from '@mui/material';
import { IModule } from '../../features/modules/types';
import { ITopic } from '../../features/topics/types';
import { THUNK_ERROR, THUNK_STATUS } from '../../types/redux.types';

type TopicPrimaryAttributes = Omit<ITopic, '_id'> | ITopic;

type SubmitHandler<T> = T extends { type: 'update' }
? ITopic
: Omit<ITopic, '_id'>

interface IBaseTopicForm {
    status: THUNK_STATUS;
    error: THUNK_ERROR;
    moduleId: IModule['_id'];
}

interface IUpdateTopicForm extends IBaseTopicForm {
    initial: ITopic;
    type: 'update';
    onSubmit: (topic: SubmitHandler<IUpdateTopicForm>) => void;
}

interface ICreateTopicForm extends IBaseTopicForm {
    initial?: ITopic;
    type: 'create';
    onSubmit: (topic: SubmitHandler<ICreateTopicForm>) => void;
}

type CreateTopicFormProps = IUpdateTopicForm | ICreateTopicForm;

const initialState = (topic : ITopic | null, moduleId: IModule['_id']) : TopicPrimaryAttributes => {
     return topic
     ? topic
     : { title: '', content: '', module: moduleId, questions: [] }
}

const CreateTopicForm : FC<CreateTopicFormProps> = ({moduleId, onSubmit, initial = null, status, error, type}) => {

    const dispatch = useAppDispatch();
    
    const [topic, setTopic] = useState<TopicPrimaryAttributes>(initialState(initial, moduleId));

    const handleChangeTopic = (e: ChangeEvent<HTMLInputElement>) => {
        setTopic(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmitTopicForm = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === "create") {
            onSubmit(topic as Omit<ITopic, '_id'>);
            setTopic(initialState(initial, moduleId));
        } else {
            onSubmit(topic as ITopic);
        }
    }

    useEffect(() => {
        return () => {
            if (type === 'create') {
                dispatch(resetCreateTopicState());
            } else {
                dispatch(resetUpdateTopicState());
            }
        }
    }, [dispatch, type]);

    return (
       <Box component="form" onSubmit={handleSubmitTopicForm}>
       <TextField
        fullWidth
        name='title'
        value={topic.title}
        onChange={handleChangeTopic}
        label="Title"
        required
        margin="normal"
        />
        <TextField
        fullWidth
        name='content'
        value={topic.content}
        onChange={handleChangeTopic}
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
        { status === 'fetching' ? 'Trying to creating topic' : 'Add new  topic' }
        </Button>
        {
            error && <Alert severity="error" sx={{marginTop: 2}}>Error: {error}</Alert>
        }
       </Box>
    )
}

export default CreateTopicForm;