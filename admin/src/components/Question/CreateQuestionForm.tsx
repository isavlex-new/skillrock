import { useState, FC, SyntheticEvent, ChangeEvent, FormEvent } from 'react';
import { Box, TextField, MenuItem, Button, Alert, Tabs, Tab } from '@mui/material';
import { QUESTION_TYPES, QUESTION_DIFFICULTLY } from '../../constants';
import Options from './Options';
import { v4 } from 'uuid';
import { IQuestion, IQuestionOption, ITopic } from '../../features/topics/types';
import { THUNK_ERROR, THUNK_STATUS } from '../../types/redux.types';


export type IDraggableOption = IQuestionOption & {id: string};

interface IQuestionWithDraggableOptions extends Omit<IQuestion, 'options'> {
    options: IDraggableOption[];
}

type QuestionInitialValue = IQuestionWithDraggableOptions | Omit<IQuestionWithDraggableOptions, '_id'>

interface IBaseQuestionForm {
    topicId: ITopic['_id'];
    status: THUNK_STATUS;
    error: THUNK_ERROR;
}

interface ICreateQuestionForm extends IBaseQuestionForm {
   initial?: IQuestion;
   type: 'create';
   onSubmit: (question: Omit<IQuestion, '_id'>) => void;
}

interface IUpdateQuestionForm extends IBaseQuestionForm {
    initial: IQuestion;
    type: 'update';
    onSubmit: (question: IQuestion) => void;
}

type QuestionFormProps = ICreateQuestionForm | IUpdateQuestionForm;

const initialState = (question: IQuestion | Omit<IQuestion, '_id'> | null, topicId: ITopic['_id']) : QuestionInitialValue => {
    if (question) {
        return {...question, options: question.options.map(o => ({...o, id: v4()}))}
    }
    return {topic: topicId, text: '', type: QUESTION_TYPES[0], difficulty: QUESTION_DIFFICULTLY[0], options: [], explanation: ''}
}

const getButtonLabel = (type: 'create' | 'update', status: THUNK_STATUS) => {
    if (status === 'fetching') {
        return type === 'update' ? 'Updating...' : 'Creating';
    }
    return type === 'update' ? 'Update' : 'Create';
}

const CreateQuestionForm : FC<QuestionFormProps> = ({topicId, initial = null, status, error, onSubmit, type}) => {

    const [question, setQuestion] = useState(initialState(initial, topicId));

    const [tab, setTab] = useState('form');

    const handleChangeTab = (_: SyntheticEvent, value: string) => setTab(value);
    
    const handleChangeQuestion = (e : ChangeEvent<HTMLInputElement>) => {
        setQuestion(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmitQuestionForm = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (type === 'create') {
            onSubmit(question as Omit<IQuestion, '_id'>);
            setQuestion(initialState(question, topicId));
        } else {
            onSubmit(question as IQuestion);
        }
    }

    const handleChangeOptions = (options : IDraggableOption[]) => {
        setQuestion(prev => ({...prev, options}));
    }

    return (
    <>
    <Tabs value={tab} onChange={handleChangeTab}>
    <Tab value="form" label="Question" />
    <Tab value="options" label="Options" />
    </Tabs>
    {
        tab === "form" 
        ? (
            <Box component="form" onSubmit={handleSubmitQuestionForm}>
            <TextField
             fullWidth 
             type="text"
             name="text"
             value={question.text}
             label="Text"
             onChange={handleChangeQuestion}
             variant="outlined"
             margin='normal'
            />
            <TextField
             fullWidth 
             type="text"
             name="explanation"
             label="Explanation"
             value={question.explanation}
             onChange={handleChangeQuestion}
             variant="outlined"
             margin='normal'
            />
            <TextField
             fullWidth 
             select 
             value={question.difficulty} 
             onChange={handleChangeQuestion} 
             name="difficultly" 
             label="Difficultly"
             margin='normal'
             >
            {
               QUESTION_DIFFICULTLY.map(difficulty => <MenuItem key={difficulty} value={difficulty}>
               {difficulty}
               </MenuItem>)
            }
            </TextField>
            <TextField
             fullWidth 
             select 
             value={question.type} 
             onChange={handleChangeQuestion} 
             name="type" 
             label="Type"
             margin='normal'
             >
            {
               QUESTION_TYPES.map(type => <MenuItem key={type} value={type}>
               {type}
               </MenuItem>)
            }
            </TextField>
            <Button type="submit" variant='contained' sx={{marginTop: 2}} fullWidth>
            {getButtonLabel(type, status)}
            </Button>
            {
              error && <Alert severity="error" sx={{marginTop: 2}}>Error: {error}</Alert>
            }
            </Box>
        )
        : <Options options={question.options} setStateOptions={handleChangeOptions} />
    }
    </>
    )
}

export default CreateQuestionForm;


