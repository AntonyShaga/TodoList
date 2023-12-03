import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState:InitialStateType;

beforeEach(() => {
    startState = {
        status:"idle",
        error:null
    }
})
test('corect error message should be set', () => {


    const endState = appReducer(startState, setErrorAC('some error'))

    expect(endState.error).toBe('some error');
})
test('corect status should be set', () => {


    const endState = appReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading');
})
