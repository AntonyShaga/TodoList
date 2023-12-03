import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, SetAppStatusActionType} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all",entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({...tl, filter: 'all' ,entityStatus: 'idle'}))
        default:
            return state
    }
}

//action
export const RemoveTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id} as const)
export const AddTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangaTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const ChangaTodolistFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const SetTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLIST', todolists} as const)


//thunk
export const fetchTodolistTC = (): any =>
    (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(SetTodolistsAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
    }

export const RemoveTodolistTC = (todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                const action = RemoveTodolistAC(todolistId)
                dispatch(action)
            })
    }

export const AddTodolistTC = (title: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                const action = AddTodolistAC(res.data.data.item)
                dispatch(action)
                dispatch(setStatusAC('loading'))
            })
    }
export const ChangaTodolistTitleTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                const action = ChangaTodolistTitleAC(todolistId, title)
                dispatch(action)
            })
    }

//types

export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type RemoweTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type SetTodolistActionType = ReturnType<typeof SetTodolistsAC>

export type ActionsType =
    | AddTodolistActionType
    | RemoweTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof ChangaTodolistTitleAC>
    | ReturnType<typeof ChangaTodolistFilterAC>

export type FilterValuesType = "all" | "completed" | "active"
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}



