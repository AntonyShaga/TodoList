import {AddTodolistActionType, RemoveTodolistActionType, SetTodosType} from './todolists-reducer';
import {taskAPI, TaskStatuses, TaskTypeAPI, UpdateTaskModelType,} from "../api/todolist-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../app/AppWithRedux";
import {AppRootStateType} from "../app/store";
import {setAppErrorAC, SetAppErrorActionType, setStatusAC, SetStatusType} from "../app/app-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTaskAC>

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosType
    | SetTasksActionType
    | SetStatusType
    | SetAppErrorActionType

type ThunkDispatch = Dispatch<ActionsType | SetStatusType | SetAppErrorActionType>

const initialeState: TasksStateType = {}
export const tasksReducer = (state = initialeState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASK": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "SET-TODOS" : {
            const copyState = {...state}
            action.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    status: action.status
                } : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (task: TaskTypeAPI) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (
    taskId: string,
    status: TaskStatuses,
    todolistId: string
) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (
    taskId: string,
    title: string,
    todolistId: string
) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}
export const setTaskAC = (todolistId: string, tasks: TaskTypeAPI[]) => {
    return {type: 'SET-TASK', tasks, todolistId} as const
}
export const getTasksTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setStatusAC('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setStatusAC('loading'))
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('ERROR'))
                }
            }
            dispatch(setStatusAC('failed'))
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    dispatch(setStatusAC('loading'))
    const rotState = getState()
    const task = rotState.tasks[todolistId].find(el => el.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            ...task,
            title: task.title,
            status
        }
        taskAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
                dispatch(setStatusAC('succeeded'))
            })
    }
}