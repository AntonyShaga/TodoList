import axios, {AxiosResponse} from 'axios'
import {LoginDataType} from "../../features/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {

        'API-KEY': '044ec9dc-0b7b-4a82-9dda-ff56e7fcaefd',
    },
})

export const authAPI = {
    me() {
        return instance.get<ResponseType<userType>>(`auth/me`)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginDataType>(`/auth/login`, data)
    },
    logout () {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<null, AxiosResponse<ResponseType<{ item: TodolistTypeAPI }>>, {
            title: string
        }>(`todo-lists/${todolistId}`, {title})
    },
    getTodolists() {
        return instance.get<TodolistTypeAPI[]>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<null, AxiosResponse<ResponseType<{ item: TodolistTypeAPI }>>, {
            title: string
        }>(`todo-lists/`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}

export const taskAPI = {
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskTypeAPI }>, AxiosResponse<ResponseType<{
            item: TaskTypeAPI
        }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post <ResponseType<{ item: TaskTypeAPI }>, AxiosResponse<ResponseType<{ item: TaskTypeAPI }>>, {
            title: string
        }>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TodolistTypeAPI = {
    id: string
    addedDate: Date
    order: number
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskTypeAPI[]
}
export type TaskTypeAPI = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type userType = {
    id: number
    email: string
    login: string
}

