import {AddTodolistActionType, RemoweTodolistActionType, SetTodolistActionType,} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {TasksStateType} from "../../app/App";

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId] : state[action.todolistId].filter(e => e.id !== action.taskId)}
        case "ADD-TASKS":
            return {...state, [action.task.todoListId] : [action.task,...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {
                ...state,
                  [action.todolistId] : state[action.todolistId]
                    .map(t=> t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'ADD-TODOLIST' :
            return {...state, [action.todolist.id] : []}
        case 'SET-TODOLIST' : {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS' :
            return {...state,[action.todolistId] : action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASKS', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModuleType, todolistId: string) =>
    ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)

//thunsk
export const fetchTaskstTC = (todolistId: string): any =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
              dispatch(setTasksAC(res.data.items, todolistId))
            })
        }
export const addTaskTC = (title: string, todolistId: string): any =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
              const task = res.data.data.item
              const action = addTaskAC(task)
              dispatch(action)
            })
        }
export const removeTaskTC = (taskId: string, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
        }
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModuleType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            console.warn("task not found in the state")
            return;
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
              const action = updateTaskAC(taskId, domainModel, todolistId)
              dispatch(action)
            })
        }

//types

export type UpdateDomainTaskModuleType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoweTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>