import { instance } from "common/api/instance";
import { AxiosResponse } from "axios";
import { BaseResponse } from "common/types";
import { TodolistTypeAPI } from "features/TodolistsList/api/todolists/todolists.api.types";

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<
      null,
      AxiosResponse<BaseResponse<{ item: TodolistTypeAPI }>>,
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
      AxiosResponse<BaseResponse<{ item: TodolistTypeAPI }>>,
      {
        title: string;
      }
    >(`todo-lists/`, { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
  },
};
