import { instance } from "common/api/instance";
import { BaseResponseType } from "common/types";
import { AxiosResponse } from "axios/index";
import { GetTasksResponse, TaskType, UpdateTaskModelType } from "features/TodolistsList/api/tasks/tasks.api.types";

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
