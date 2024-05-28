import { taskAPI, TaskPriorities, TaskStatuses, TaskTypeAPI, UpdateTaskModelType } from "common/api/todolist-api";
import { AppRootStateType, AppThunk } from "app/store";
import { appActions } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todolistsAction } from "features/TodolistsList/todolists-reducer";

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
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
    addTask: (state, action: PayloadAction<{ task: TaskTypeAPI }>) => {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      const taskForcurrentTodolist = state[action.payload.todolistId];
      const index = taskForcurrentTodolist.findIndex((task) => task.id === action.payload.taskId);
      if (index !== -1) taskForcurrentTodolist[index] = { ...taskForcurrentTodolist[index], ...action.payload.model };
    },
    setTask: (state, action: PayloadAction<{ todolistId: string; tasks: TaskTypeAPI[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsAction.removeTodolists, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsAction.setTodoList, (state, action) => {
        action.payload.todolist.forEach((el) => (state[el.id] = []));
      });
  },
});

export const getTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    taskAPI.getTasks(todolistId).then((res) => {
      dispatch(tasksActions.setTask({ todolistId, tasks: res.data.items }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
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
        dispatch(appActions.setAppEror({ error: e.message }));
        dispatch(appActions.setAppStatus({ status: "failed" }));
      });
  };
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    taskAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.addTask({ task: res.data.data.item }));
          dispatch(appActions.setAppStatus({ status: "succeeded" }));
        } else {
          handleServerAppError<{ item: TaskTypeAPI }>(dispatch, res.data);
        }
      })
      .catch((e) => {
        handleServerNetworkError(dispatch, e);
      });
  };
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
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
