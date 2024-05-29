import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { todolistAPI, TodolistTypeAPI } from "features/TodolistsList/todolists.api";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistTypeAPI & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
type ThunkDispatch = any;

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolists: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistTypeAPI }>) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      state.unshift(newTodolist);
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
    setTodoList: (state, action: PayloadAction<{ todolist: TodolistTypeAPI[] }>) => {
      action.payload.todolist.forEach((el) => state.push({ ...el, filter: "all", entityStatus: "idle" }));
    },
    /*clearTodosData: (state, action) => {
      state;
    },*/
  },
});

export const setTodolistsTC = (): AppThunk => (dispatch) => {
  todolistAPI.getTodolists().then((res) => {
    dispatch(todolistsAction.setTodoList({ todolist: res.data }));
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
  });
};
export const removeTodolistsTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(todolistsAction.setEntityStatus({ todolistId, entityStatus: "loading" }));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        dispatch(todolistsAction.removeTodolists({ todolistId }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      })
      .catch((e) => {
        dispatch(appActions.setAppError({ error: e.message }));
        dispatch(todolistsAction.setEntityStatus({ todolistId, entityStatus: "idle" }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      });
  };
export const addTodolistsTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI.createTodolist(title).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsAction.addTodolist({ todolist: res.data.data.item }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError<{ item: TodolistTypeAPI }>(dispatch, res.data);
      }
    });
  };
export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(todolistsAction.changeTodolistTitle({ todolistId, title }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError<{ item: TodolistTypeAPI }>(dispatch, res.data);
      }
    });
  };
export const todolistsAction = slice.actions;
export const todolistsReducer = slice.reducer;
