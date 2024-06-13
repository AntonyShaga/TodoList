import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { authAPI } from "features/auth/api/authApi";
import { LoginDataType } from "features/auth/api/authApi.types";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums/enums";
import { action } from "@storybook/addon-actions";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
    captcha: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(captchaS.fulfilled, (state, action) => {
        console.log(action.payload.captcha);
        state.captcha = action.payload.captcha;
      })
      .addMatcher(
        isAnyOf(authThunk.login.fulfilled, authThunk.logOut.fulfilled, authThunk.initializeApp.fulfilled),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      )
      .addMatcher(isAnyOf(authThunk.initializeApp.fulfilled, authThunk.initializeApp.rejected), (state, action) => {
        state.isInitialized = true;
      });
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginDataType>(
  `${slice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authAPI.login(data);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      //const isShowAppError = !res.data.fieldsErrors.length;
      if (res.data.resultCode === ResultCode.Captcha) {
        dispatch(authThunk.captchaS());
      }
      return rejectWithValue(res.data);
    }
  },
);

const captchaS = createAppAsyncThunk<{ captcha: string }, void>(`${slice.name}/captcha`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const res = await authAPI.captcha();
  console.log(res.data.url);
  return { captcha: res.data.url };
});

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunk = { login, logOut, initializeApp, captchaS };
