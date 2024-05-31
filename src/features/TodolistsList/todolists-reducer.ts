import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { todolistAPI, TodolistTypeAPI } from "features/TodolistsList/todolists.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
import { ResultCode } from "common/enums/enums";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistTypeAPI & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    setEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolist.forEach((el) => state.push({ ...el, filter: "all", entityStatus: "idle" }));
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todolistId);
        if (index !== -1) state[index].title = action.payload.title;
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        };
        state.unshift(newTodolist);
      })
      .addCase(clearTasksAndTodolists, () => {
        return [];
      });
  },
});
const fetchTodolist = createAppAsyncThunk<{ todolist: TodolistTypeAPI[] }, void>(
  `${slice.name}/fetchTodolist`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolist: res.data };
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const addTodolist = createAppAsyncThunk<{ todolist: TodolistTypeAPI }, string>(
  `${slice.name}/addTodolists`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistAPI.createTodolist(title);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolist: res.data.data.item };
      } else {
        handleServerAppError<{ item: TodolistTypeAPI }>(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  `${slice.name}/removeTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(todolistsAction.setEntityStatus({ todolistId, entityStatus: "loading" }));
      const res = await todolistAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { todolistId };
      } else {
        handleServerAppError(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      dispatch(todolistsAction.setEntityStatus({ todolistId, entityStatus: "idle" }));
      return rejectWithValue(null);
    }
  },
);
const changeTodolistTitle = createAppAsyncThunk<
  { todolistId: string; title: string },
  {
    todolistId: string;
    title: string;
  }
>(`${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistAPI.updateTodolist(arg.todolistId, arg.title);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } else {
      handleServerAppError<{ item: TodolistTypeAPI }>(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e);
    return rejectWithValue(null);
  }
});
export const todolistsAction = slice.actions;
export const todolistsReducer = slice.reducer;

export const todolistThunk = { addTodolist, removeTodolist, changeTodolistTitle, fetchTodolist };
