import { appActions, appReducer, initialState } from "app/app-reducer";

let startState: initialState;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
  };
});

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "Some error" }));
  expect(endState.error).toBe("Some error");
});

test("correct status should be set", () => {
  const endState = appReducer(startState, appActions.setAppStatus({ status: "loading" }));
  expect(endState.status).toBe("loading");
});
