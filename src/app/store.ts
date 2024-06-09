import { tasksReducer } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsReducer } from "features/TodolistsList/model/todolists/todolistsSlice";
import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/auth/model/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

export const useAppSellector: TypedUseSelectorHook<AppRootStateType> = useSelector;
