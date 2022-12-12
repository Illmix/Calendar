import {IUser} from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    isError: string;
}

export enum AuthActionsEnum {
    SET_AUTH = "SET_AUTH",
    SET_USER = "SET_USER",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING"
}

export interface SetAuthAction {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}

export interface SetUserAction {
    type: AuthActionsEnum.SET_USER;
    payload: IUser;
}

export interface SetErrorAction {
    type: AuthActionsEnum.SET_ERROR;
    payload: string;
}

export interface SetLoadingAction {
    type: AuthActionsEnum.SET_LOADING;
    payload: boolean;
}

export type AuthAction = SetAuthAction | SetUserAction | SetErrorAction | SetLoadingAction;
