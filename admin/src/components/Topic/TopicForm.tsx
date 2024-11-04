import { FC } from 'react';
import { Divider } from '@mui/material';
import TopicFormHeader from './TopicFormHeader';
import Questions from '../Question/Questions';
import { ITopicWithQuestions } from '../../features/topics/types';

interface ITopicFormProps {
    currentTopic: ITopicWithQuestions;
}

const TopicForm : FC<ITopicFormProps> = ({currentTopic}) => {

    return (
        <>
        <TopicFormHeader topic={currentTopic} />
        <Divider sx={{marginTop: 4, marginBottom: 4}} />
        <Questions questions={currentTopic.questions} />
        </>
    )
}

export default TopicForm;