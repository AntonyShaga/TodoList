import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '044ec9dc-0b7b-4a82-9dda-ff56e7fcaefd'
    }
})

//api
export const todolistsAPI = {
    getTodolists() {
        return  instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title:string) {
        return  instance.post <ResponseType<{item:TodolistType}>>("todo-lists",{title: title})
    },
    deleteTodolist(id:string) {
        return  instance.delete <ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id:string,title:string) {
        return  instance.put <ResponseType>(`todo-lists/${id}`,{title: title})
    },
    getTasks(todolistId:string) {
        return  instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string, taskId:string) {
        return  instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,model:UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    createTask(todolistId:string,taskTitle:string) {
        return  instance.post<ResponseType<{item :TaskType} >> (`todo-lists/${todolistId}/tasks`,{title: taskTitle})
    }
}
export const authAPI = {
    login(data:LoginParamsType) {
       return  instance.post <ResponseType<{ userId?: number }>>("auth/login",data)
    },
    logout(){
        return  instance.delete <ResponseType<{ userId?: number }>>("auth/login")
    },
    me() {
        return  instance.get <ResponseType<{ id: number,email:string, login:string }>>("auth/me")
    }
}
//types
export type LoginParamsType = {
    email:string
    password:string
    rememberMe: boolean
    captcha?: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode:number
    messages:Array<string>
    data: D
}
export type TaskType = {
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
export type GetTaskResponse = {
    items: Array<TaskType>
    error: string | null
    totalCount:number
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

//enum
export enum TaskStatuses {
    New=0,
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



