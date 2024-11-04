import { IReduxTableDefaultState, IReduxSingleDefaultState } from "../../types/redux.types";

export interface IPermission {
  _id?: string;
  name: string;
  description: string;
}

export interface PermissionState extends IReduxSingleDefaultState {
    permission: IPermission | null,
}

export interface PermissionsState extends IReduxTableDefaultState {
    permissions: IPermission[],
}

export interface updatePermissionProps {
    permissionId: IPermission["_id"],
    updatedPermission: IPermission
}
