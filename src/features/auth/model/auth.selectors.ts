import { AppRootStateType } from "app/store";

export const selectIsLogetIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectCaptcha = (state: AppRootStateType) => state.auth.captcha;
export const selectIsInitialized = (state: AppRootStateType) => state.auth.isInitialized;
