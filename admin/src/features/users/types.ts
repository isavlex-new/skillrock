import { IRole } from "../roles/types";
import { IReduxSingleDefaultState, IReduxTableDefaultState } from "../../types/redux.types";

export interface IUser {
    _id: string,
    first_name: string,
    last_name: string,
    birthday: string,
    username: string,
    password: string,
    avatar: string;
    role: string
}

export interface IUserWithRole extends Omit<IUser, 'role'> {
   role: IRole;
}

export interface UserState extends IReduxSingleDefaultState {
    user: IUserWithRole | null,
}

export interface UsersState extends IReduxTableDefaultState {
    users: IUserWithRole[];
}


