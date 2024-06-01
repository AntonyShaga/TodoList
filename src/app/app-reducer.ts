import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type initialState = ReturnType<typeof slice.getInitialState>;
export const appReducer = slice.reducer;
export const appActions = slice.actions;
