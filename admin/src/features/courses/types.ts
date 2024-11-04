import { IReduxTableDefaultState } from "../../types/redux.types";
import { IModule } from "../modules/types";
import { IUser } from "../users/types";


export interface ICourse {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  modules: IModule['_id'][];
  students: string;
}

export interface ICourseWithInstructor extends Omit<ICourse, 'instructor'> {
  instructor: IUser;
}

export interface ICourseWithModulesWithInstructors extends Omit<ICourse, 'modules' | 'instructor'> {
  modules: IModule[];
  instructor: IUser;
}

export interface ICourseState extends IReduxTableDefaultState {
   course: ICourseWithModulesWithInstructors | null;
}

export interface ICoursesState extends IReduxTableDefaultState {
   courses: ICourseWithInstructor[];
}

export interface IRemoveModulePayload {
   courseId: ICourse['_id'];
   moduleId: IModule['_id'];
}
