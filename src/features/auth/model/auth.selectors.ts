import { AppRootStateType } from "app/store";

export const selectIsLogetIn = (state: AppRootStateType) => state.auth.isLoggedIn;
