
export type THUNK_STATUS = 'idle' | 'fetching' | 'failed' | 'succeeded';

export type THUNK_ERROR = string | null;

export interface IReduxTableDefaultState {
    status: THUNK_STATUS;
    error: THUNK_ERROR;
    creatingStatus: THUNK_STATUS;
    creatingError: THUNK_ERROR;
    updatingStatus: THUNK_STATUS;
    updatingError: THUNK_ERROR;
}

export interface IReduxSingleDefaultState extends Pick<IReduxTableDefaultState, 'status' | 'error' > {}