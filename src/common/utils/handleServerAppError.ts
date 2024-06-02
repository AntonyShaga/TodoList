import { Dispatch } from "redux";
import { BaseResponseType } from "common/types/commonTypes";
import { appActions } from "app/app-reducer";

/**
 * The handleServerAppError function is designed to handle server errors
 * and update the application state through Redux actions.
 *
 * @template T - A generic type parameter, allowing the function to work with various types of responses.
 *
 * @param {Dispatch} dispatch - The dispatch function from Redux, used to send actions to the store.
 * @param {BaseResponseType<T>} data - The server response object, containing error messages and data.
 * @param {boolean} [showError=true] - A flag indicating whether to show the error message. Defaults to true.
 * @returns {void} - This function does not return a value.
 */
export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponseType<T>, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
