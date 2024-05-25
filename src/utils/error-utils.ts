import { Dispatch } from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api"

type ErrorUtilsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>

export const handleServerAppError = <T>(dispatch:ErrorUtilsDispatchType,data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('ERROR'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = (dispatch:ErrorUtilsDispatchType, e:{message:string}) => {
    dispatch(setAppErrorAC(e.message))
    dispatch(setAppStatusAC('failed'))
}
