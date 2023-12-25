import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState:InitialStateType = {
    status:"idle",
    error:null,
    isInitialized:false
}

export const appReducer = (state:InitialStateType = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state,status:action.status}
        case 'APP/SET-ERROR':
            return {...state,error:action.error}
        case "APP/SET-IS-INITIALAZED":
            return {...state,isInitialized:action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialazedAC = (value:boolean) => ({type: 'APP/SET-IS-INITIALAZED', value} as const)

export const initialazedTC = () => (dispatch:Dispatch) => {
    authAPI.me().then(res=>{
        if(res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))

        } else  {

        }
        dispatch(setAppInitialazedAC(true))
    })
}

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized:boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type ActionsType = SetAppStatusActionType | SetAppErrorActionType | ReturnType<typeof setAppInitialazedAC>

