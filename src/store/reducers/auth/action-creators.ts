import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (payload: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload}),
    setIsAuth: (payload: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload}),
    setIsError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetLoadingAction => ({type: AuthActionsEnum.SET_LOADING, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async ()=>{
                const response = await UserService.getUsers();
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true));
                }
                else {
                    dispatch(AuthActionCreators.setIsError("Incorrect login or password."))
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (e: any) {
            dispatch(AuthActionCreators.setIsError(e.message))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setIsAuth(false));
    }
}