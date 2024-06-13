import { instance } from "common/api/instance";
import { BaseResponse } from "common/types";
import { AxiosResponse } from "axios";
import { GetTasksResponse, Tasks, UpdateTaskModel } from "features/TodolistsList/api/tasks/tasks.api.types";

export const taskAPI = {
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<
      BaseResponse<{ item: Tasks }>,
      AxiosResponse<
        BaseResponse<{
          item: Tasks;
        }>
      >,
      UpdateTaskModel
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      BaseResponse<{ item: Tasks }>,
      AxiosResponse<BaseResponse<{ item: Tasks }>>,
      {
        title: string;
      }
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
