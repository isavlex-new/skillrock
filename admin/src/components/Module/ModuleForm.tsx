import { FC } from 'react';
import { Divider } from '@mui/material';
import ModuleFormHeader from './ModuleFormHeader';
import Topics from '../Topic/Topics';
import { IModuleWithTopics } from '../../features/modules/types';


interface IModuleFormProps {
    currentModule: IModuleWithTopics;
}

const ModuleForm : FC<IModuleFormProps> = ({currentModule}) => {

    return (
        <>
        <ModuleFormHeader module={currentModule} />
        <Divider sx={{marginTop: 4, marginBottom: 4}} />
        <Topics topics={currentModule.topics} />
        </>
    )

}

export default ModuleForm;