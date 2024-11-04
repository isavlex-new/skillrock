import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedStore';
import { fetchModule } from '../../features/modules/modulesThunk';
import { resetState } from '../../features/modules/moduleSlice';
import { Container } from '@mui/material';
import ModuleLoader from '../../UI/ModuleLoader';
import PageStateProvider from '../../UI/PageStateProvider';
import ModuleForm from '../../components/Module/ModuleForm';
import { IModuleWithTopics } from '../../features/modules/types';

export const Module = () => {
    
    const { moduleId } = useParams();

    const dispatch = useAppDispatch();

    const { module, status, error } = useAppSelector(state => state.module);

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchModule(moduleId as string));
        }
      }, [moduleId, status, dispatch]);
  
      useEffect(() => {
        return () => {
          dispatch(resetState());
        }
      }, [moduleId, dispatch]);

      return (
        <Container maxWidth="lg">
        <PageStateProvider 
        loading={{state: status === 'fetching', component: <ModuleLoader />}}
        error={{state: status === 'failed', component: <h1>Error: {error}</h1>}}
        success={{state: status === 'succeeded', component: <ModuleForm currentModule={module as IModuleWithTopics} />}}
        />
        </Container>
      )

}

export default Module;