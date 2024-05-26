import {Dispatch} from 'redux'
import {
    SetAppErrorActionType,
    setAppIsInitializedAC,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {authAPI} from "../../common/api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utils";
import {LoginDataType} from "./Login";
import {clearTodosDataAC, clearTodosDataType} from "../TodolistsList/todolists-reducer";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const

// thunks
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }))
        dispatch(setAppStatusAC('failed'))
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearTodosDataAC())
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }))
        dispatch(setAppStatusAC('failed'))
    }
}

export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setAppIsInitializedAC(true))
    }
}
// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | clearTodosDataType