import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistReducer} from "../features/Todolists/todolists-reducer";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    todolist:todolistReducer,
    tasks:tasksReducer
})

/*type AppRootState = {
    todolist: Array<TodolistType>
    tasks: TasksStateType
}*/

export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = store