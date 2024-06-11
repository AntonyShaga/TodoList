import { createSlice, isAnyOf, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/auth/api/authApi";
import { LoginDataType } from "features/auth/api/authApi.types";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums/enums";
import { thunkTryCatch } from "common/utils/thunk-try-catch";

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
    builder.addMatcher(
      isAnyOf(authThunk.login.fulfilled, authThunk.logOut.fulfilled, authThunk.initializeApp.fulfilled),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(data);
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true };
      } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(dispatch, res.data, isShowAppError);
        return rejectWithValue(res.data);
      }
    });
  },
);

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(dispatch, res.data);
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(authActions.setAppIsInitialized({ isInitialized: true }));
  });
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { login, logOut, initializeApp };
