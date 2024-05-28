import { taskAPI, TaskPriorities, TaskStatuses, TaskTypeAPI, UpdateTaskModelType } from "common/api/todolist-api";
import { AppThunk } from "app/store";
import { appActions } from "app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "common/utils/error-utils";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof updateTaskAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksActionType = ReturnType<typeof setTaskAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | SetTasksActionType
  | any;

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

type ThunkDispatch = any;

export type TasksStateType = {
  [key: string]: Array<TaskTypeAPI>;
};

const initialeState: TasksStateType = {};
export const tasksReducer = (state = initialeState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASK": {
      return { ...state, [action.todolistId]: action.tasks };
    }
    case "SET-TODOS": {
      const copyState = { ...state };
      action.todos.forEach((el: any) => {
        copyState[el.id] = [];
      });
      return copyState;
    }
    case "REMOVE-TASK": {
      return { ...state, [action.todolistId]: state[action.todolistId].filter((el) => el.id !== action.taskId) };
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId ? { ...el, ...action.model } : el,
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((el) =>
          el.id === action.taskId
            ? {
                ...el,
                title: action.title,
              }
            : el,
        ),
      };
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.todolist.id]: [] };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "CLEAR-DATA": {
      return {};
    }
    default:
      return state;
  }
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: "REMOVE-TASK", todolistId, taskId } as const;
};
export const addTaskAC = (task: TaskTypeAPI) => {
  return { type: "ADD-TASK", task } as const;
};
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
  return { type: "UPDATE-TASK", model, todolistId, taskId } as const;
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return { type: "CHANGE-TASK-TITLE", title, todolistId, taskId } as const;
};
export const setTaskAC = (todolistId: string, tasks: TaskTypeAPI[]) => {
  return { type: "SET-TASK", tasks, todolistId } as const;
};
export const getTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    taskAPI.getTasks(todolistId).then((res) => {
      dispatch(setTaskAC(todolistId, res.data.items));
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
        dispatch(removeTaskAC(todolistId, taskId));
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
          dispatch(addTaskAC(res.data.data.item));
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
            dispatch(updateTaskAC(taskId, domainModel, todolistId));
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
