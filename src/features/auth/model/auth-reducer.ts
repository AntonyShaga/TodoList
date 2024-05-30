import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { handleServerAppError } from "common/utils";
import { authAPI } from "features/auth/api/authApi";
import { LoginDataType } from "features/auth/api/authApi.types";
import { clearTasksAndTodolists } from "common/actions";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

// thunks
export const loginTC =
  (data: LoginDataType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(dispatch, res.data);
        dispatch(appActions.setAppStatus({ status: "failed" }));
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as { message: string });
      dispatch(appActions.setAppStatus({ status: "failed" }));
    }
  };
export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(clearTasksAndTodolists());
    } else {
      handleServerAppError(dispatch, res.data);
      dispatch(appActions.setAppStatus({ status: "failed" }));
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as { message: string });
    dispatch(appActions.setAppStatus({ status: "failed" }));
  }
};

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    } else {
      handleServerAppError(dispatch, res.data);
      dispatch(appActions.setAppStatus({ status: "failed" }));
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as { message: string });
    dispatch(appActions.setAppStatus({ status: "failed" }));
  } finally {
    dispatch(appActions.setAppIsInitialized({ isInitialized: true }));
  }
};

export const authReducer = slice.reducer;
export const authActions = slice.actions;
