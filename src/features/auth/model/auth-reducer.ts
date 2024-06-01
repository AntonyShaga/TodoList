import { Dispatch } from "redux";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "app/store";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/auth/api/authApi";
import { LoginDataType } from "features/auth/api/authApi.types";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums/enums";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
  },
  reducers: {
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunk.login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(authThunk.logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(authThunk.initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        handleServerAppError(dispatch, res.data);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as { message: string });
      return rejectWithValue(null);
    }
  },
);

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as { message: string });
    return rejectWithValue(null);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: true }, void>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      //handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as { message: string });
    return rejectWithValue(null);
  } finally {
    dispatch(authActions.setAppIsInitialized({ isInitialized: true }));
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { login, logOut, initializeApp };
