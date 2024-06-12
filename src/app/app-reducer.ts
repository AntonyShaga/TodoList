import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { todolistThunk } from "features/TodolistsList/model/todolists/todolistsSlice";
import { tasksThunk } from "features/TodolistsList/model/tasks/tasksSlice";
import { authThunk } from "features/auth/model/auth-reducer";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
  },
  extraReducers: (bilder) => {
    bilder.addMatcher(isPending, (state) => {
      state.status = "loading";
    });
    bilder.addMatcher(isRejected, (state, action: AnyAction) => {
      state.status = "failed";
      if (action.payload) {
        if (
          action.type === todolistThunk.addTodolist.rejected.type ||
          action.type === tasksThunk.addTask.rejected.type ||
          action.type === authThunk.initializeApp.rejected.type
        ) {
          return;
        }
        state.error = action.payload.messages[0];
      } else {
        state.error = action.error.message ? action.error.message : "Some error occurred";
      }
    });
    bilder.addMatcher(isFulfilled, (state) => {
      state.status = "succeeded";
    });
  },
});

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type initialState = ReturnType<typeof slice.getInitialState>;
export const appReducer = slice.reducer;
export const appActions = slice.actions;
