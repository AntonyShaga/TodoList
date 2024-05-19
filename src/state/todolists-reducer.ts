import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {todolistAPI, TodolistTypeAPI} from '../api/todolist-api'
import {v1} from 'uuid';
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodosType = ReturnType<typeof setTodoListAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosType

const initialeState: Array<TodolistType> = []
export const todolistsReducer = (state = initialeState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        case "SET-TODOS" : {
            return action.todos.map(el =>( {...el,filter:'all'}))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistTypeAPI) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}
export const setTodoListAC = (todos: TodolistTypeAPI[]) => ({type: 'SET-TODOS', todos} as const)
export const setTodolistsTC = () => (dispatch:Dispatch) => {
    todolistAPI.getTodolists().then((res) => {dispatch(setTodoListAC(res.data))})
}
export const removeTodolistsTC = (title:string) => (dispatch:Dispatch) => {
    todolistAPI.deleteTodolist(title).then((res) => {dispatch(removeTodolistAC(title))})
}
export const addTodolistsTC = (title:string) => (dispatch:Dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {dispatch(addTodolistAC(res.data.data.item))})
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch:Dispatch) => {
    todolistAPI.updateTodolist(todolistId,title).then((res) => {dispatch(changeTodolistTitleAC(todolistId,title))})
}