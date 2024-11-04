import { IReduxTableDefaultState } from "../../types/redux.types";
import { IModule } from "../modules/types";

export interface ITopic {
    _id: string;
    title: string;
    content: string;
    questions: string[];
    module: IModule['_id'];
}

export interface IQuestionOption {
    text: string;
    isCorrect: boolean;
}

export interface IQuestion {
    _id: string;
    text: string;
    explanation: string | null;
    type: 'multiple-choice' | 'single-choice' | 'true-false';
    difficulty: 'easy' | 'medium' | 'hard';
    options: IQuestionOption[];
    topic: ITopic['_id'];
    createdAt?: string;
}


export interface ITopicWithQuestions extends Omit<ITopic, 'questions'> {
    questions: IQuestion[];
}

export interface ITopicState extends IReduxTableDefaultState {
    topic: ITopicWithQuestions | null;
}

export interface ITopicsState extends IReduxTableDefaultState {
    topics: ITopic[];
}

export interface IDeleteTopicQuestion {
    questionId: IQuestion['_id'];
    topicId: ITopic['_id'];
}