import {tasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSellector:TypedUseSelectorHook<AppRootStateType> = useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
