import {v1} from "uuid";
import {ChangaTodolistEntityStatusAC, FilterValuesType, SetTodolistsAC} from "./todolists-reducer";
import {
    AddTodolistAC, ChangaTodolistFilterAC,
    ChangaTodolistTitleAC,
    RemoveTodolistAC, TodolistDomainType,
    todolistReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../app/app-reducer";
let todolistId1 = v1()
let todolistId2 = v1()

const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", addedDate:'', order:0,entityStatus: 'idle'},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate:'', order:0,entityStatus: 'idle'}
]

test('corect todolist shold be removed', () => {


    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('corect todolist shold be add', () => {

    const endState = todolistReducer(startState, AddTodolistAC({
        id: '',
        title: "title no matter",
        addedDate: '',
        order: 0,
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("title no matter");
    expect(endState[0].filter).toBe("all")
    expect(endState[0].id).toBeDefined()
})
test('corect todolist shold change its name', () => {
    let newTodolist = 'New Todolist'

    const action = ChangaTodolistTitleAC(todolistId2,newTodolist)

    const endState = todolistReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolist)
})
test('corect filter of todolist shold be changet', () => {
    let newFilter : FilterValuesType = 'completed'

    const action = ChangaTodolistFilterAC(newFilter,todolistId2)

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter)
})

test('corect entity status of todolist shold be changet', () => {
    let newStatus : RequestStatusType = 'loading'

    const action = ChangaTodolistEntityStatusAC(todolistId2,newStatus)

    const endState = todolistReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus)
})

test('todolists should be set to the test', () => {
    const action = SetTodolistsAC(startState)

    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2);
})

