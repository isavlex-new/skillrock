import { IReduxTableDefaultState } from "../../types/redux.types";


export interface IRole {
    _id: string;
    name: string;
    permissions: string[];
    createdAt: string;
}

export interface IRolesState extends IReduxTableDefaultState {
    roles: IRole[];
}