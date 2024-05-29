import { AppThunk } from "app/store";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAction } from "features/TodolistsList/todolists-reducer";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { taskAPI, TaskTypeAPI, UpdateTaskModelType } from "features/TodolistsList/todolists.api";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type TasksStateType = {
  [key: string]: Array<TaskTypeAPI>;
};

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(todolistsAction.removeTodolists, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsAction.setTodoList, (state, action) => {
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
      });
  },
});
const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskTypeAPI[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await taskAPI.getTasks(todolistId);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { todolistId, tasks: res.data.items };
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);

const addTask = createAppAsyncThunk<
  { task: TaskTypeAPI },
  {
    todolistId: string;
    title: string;
  }
>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await taskAPI.createTask(arg.todolistId, arg.title);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { task: res.data.data.item };
    } else {
      handleServerAppError<{ item: TaskTypeAPI }>(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e);
    return rejectWithValue(null);
  }
});

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const rotState = getState();
      const task = rotState.tasks[arg.todolistId].find((el) => el.id === arg.taskId);
      if (!task) {
        dispatch(appActions.setAppError({ error: "Task not found in the state" }));
        return rejectWithValue(null);
      }
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };
      const res = await taskAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError<{ item: TaskTypeAPI }>(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e);
      return rejectWithValue(null);
    }
  },
);
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    taskAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        dispatch(tasksActions.removeTask({ todolistId, taskId }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      })
      .catch((e) => {
        dispatch(appActions.setAppError({ error: e.message }));
        dispatch(appActions.setAppStatus({ status: "failed" }));
      });
  };

/*
export const updateTaskTC =
  (todolistId: string, domainModel: UpdateDomainTaskModelType, taskId: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const rotState = getState();
    const task = rotState.tasks[todolistId].find((el) => el.id === taskId);
    if (task) {
      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };
      taskAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(tasksActions.updateTask({ taskId, model: domainModel, todolistId }));
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
          } else {
            handleServerAppError<{ item: TaskTypeAPI }>(dispatch, res.data);
          }
        })
        .catch((e) => {
          handleServerNetworkError(dispatch, e);
        });
    }
  };
*/
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunk = { fetchTasks, addTask, updateTask };
