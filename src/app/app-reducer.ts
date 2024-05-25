export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized:false,
    status: 'loading' as RequestStatusType,
    error: null as  null | string
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppsetAppisInitializedType = ReturnType<typeof setAppIsInitializedAC>

export type InitialStateType = typeof initialState
export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALIZED':
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppIsInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)

type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetAppsetAppisInitializedType