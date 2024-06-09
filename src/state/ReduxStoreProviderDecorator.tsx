import React from "react";
import { Provider } from "react-redux";
import { AppRootStateType } from "app/store";
import { combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolistsSlice";
import { v1 } from "uuid";
import { appReducer, RequestStatusType } from "app/app-reducer";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
});

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
  app: {
    status: "loading" as RequestStatusType,
    error: null,
  },
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as unknown as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
