import {setErrorAC, SetAppErrorActionType, setStatusAC, SetAppStatusActionType} from '../app/app-reducer'
import {ResponseTYpe} from '../api/todolists-api'
import {Dispatch} from 'redux'

export const handleServerAppError = <D>(data: ResponseTYpe<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setStatusAC('failed'))
}
