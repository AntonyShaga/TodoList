import { AppRootState } from "app/store";

export const selectIsLogetIn = (state: AppRootState) => state.auth.isLoggedIn;
export const selectCaptcha = (state: AppRootState) => state.auth.captcha;
export const selectIsInitialized = (state: AppRootState) => state.auth.isInitialized;
