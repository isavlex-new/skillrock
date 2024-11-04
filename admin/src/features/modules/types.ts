import { IReduxTableDefaultState } from "../../types/redux.types";
import { ICourse } from "../courses/types";
import { ITopic } from "../topics/types";

export interface IModule {
    _id: string;
    title: string;
    content: string;
    topics: ITopic['_id'][];
    course: ICourse['_id'];
}

export interface IModuleWithTopics extends Omit<IModule, 'topics'> {
    topics: ITopic[];
}

export interface IModuleState extends IReduxTableDefaultState {
    module: IModuleWithTopics | null;
}

export interface IRemoveModuleTopic {
   moduleId: IModule['_id'];
   topicId: string;
}