import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { resetState } from '../../features/topics/topicSlice';
import { fetchTopic } from '../../features/topics/topicThunk';
import { Container } from '@mui/material';
import TopicLoader from '../../UI/TopicLoader';
import PageStateProvider from '../../UI/PageStateProvider';
import TopicForm from '../../components/Topic/TopicForm';
import { ITopicWithQuestions } from '../../features/topics/types';



const Topic = () => {

   const { topicId } = useParams();

   const dispatch = useAppDispatch();

   const { topic, status, error } = useAppSelector(state => state.topic);

   useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchTopic(topicId as string));
    }
   }, [status, dispatch, topicId]);

   useEffect(() => {
     return () => {
        dispatch(resetState());
     }
   }, [topicId, dispatch]);

   
   return (
    <Container maxWidth="lg">
    <PageStateProvider 
     loading={{state: status === 'fetching', component: <TopicLoader />}}
     error={{state: status === 'failed', component: <h1>Error: {error}</h1>}}
     success={{state: status === 'succeeded', component: <TopicForm currentTopic={topic as ITopicWithQuestions} />}}
    />
    </Container>
   )
}

export default Topic;

