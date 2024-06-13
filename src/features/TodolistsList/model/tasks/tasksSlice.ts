import { appActions } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { todolistThunk } from "features/TodolistsList/model/todolists/todolistsSlice";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { ResultCode } from "common/enums/enums";
import { clearTasksAndTodolists } from "common/actions";
import { Tasks, UpdateTaskArg, UpdateTaskModel } from "features/TodolistsList/api/tasks/tasks.api.types";
import { taskAPI } from "features/TodolistsList/api/tasks/tasks.api";

export type TasksStateType = Record<string, Tasks[]>;

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistThunk.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(todolistThunk.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistThunk.fetchTodolist.fulfilled, (state, action) => {
        action.payload.todolist.forEach((el) => (state[el.id] = []));
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskForcurrentTodolist = state[action.payload.todolistId];
        const index = taskForcurrentTodolist.findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1)
          taskForcurrentTodolist[index] = { ...taskForcurrentTodolist[index], ...action.payload.domainModel };
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId);
        if (index !== -1) state[action.payload.todolistId].splice(index, 1);
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});
const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: Tasks[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const res = await taskAPI.getTasks(todolistId);
    return { todolistId, tasks: res.data.items };
  },
);

const addTask = createAppAsyncThunk<
  { task: Tasks },
  {
    todolistId: string;
    title: string;
  }
>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await taskAPI.createTask(arg.todolistId, arg.title);
  if (res.data.resultCode === ResultCode.Success) {
    return { task: res.data.data.item };
  } else {
    return rejectWithValue(res.data);
  }
});

const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const rotState = getState();
    const task = rotState.tasks[arg.todolistId].find((el) => el.id === arg.taskId);
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found in the state" }));
      return rejectWithValue(null);
    }
    const apiModel: UpdateTaskModel = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    };
    const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const removeTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const res = await taskAPI.deleteTask(arg.todolistId, arg.taskId);
    return arg;
  },
);

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunk = { fetchTasks, addTask, updateTask, removeTask };
