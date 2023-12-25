import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {todolistReducer} from "../features/Todolists/todolists-reducer";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import thunk , {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook,useDispatch,useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    todolist:todolistReducer,
    tasks:tasksReducer,
    app:appReducer,
    auth:authReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export type AppRootState = ReturnType<typeof store.getState>

export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
// @ts-ignore
window.store = store