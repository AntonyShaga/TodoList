import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {todolistReducer} from "../features/Todolists/todolists-reducer";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolist:todolistReducer,
    tasks:tasksReducer,
    app:appReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunkMiddleware))

export type AppRootState = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store