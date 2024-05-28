import { appActions } from "app/app-reducer";
import { ResponseType } from "../api/todolist-api";
import { Simulate } from "react-dom/test-utils";

type ErrorUtilsDispatchType = any;

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(appActions.setAppEror({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppEror({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, e: { message: string }) => {
  dispatch(appActions.setAppEror({ error: e.message ? e.message : "Some error occurred" }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
