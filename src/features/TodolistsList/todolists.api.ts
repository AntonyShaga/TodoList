import { AxiosResponse } from "axios";
import { instance } from "common/api/instance";
import { BaseResponseType } from "common/types/commonTypes";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<
      null,
      AxiosResponse<BaseResponseType<{ item: TodolistTypeAPI }>>,
      {
        title: string;
      }
    >(`todo-lists/${todolistId}`, { title });
  },
  getTodolists() {
    return instance.get<TodolistTypeAPI[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<
      null,
      AxiosResponse<BaseResponseType<{ item: TodolistTypeAPI }>>,
      {
        title: string;
      }
    >(`todo-lists/`, { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
};

export const taskAPI = {
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<
        BaseResponseType<{
          item: TaskType;
        }>
      >,
      UpdateTaskModelType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      BaseResponseType<{ item: TaskType }>,
      AxiosResponse<BaseResponseType<{ item: TaskType }>>,
      {
        title: string;
      }
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};

export type TodolistTypeAPI = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};
