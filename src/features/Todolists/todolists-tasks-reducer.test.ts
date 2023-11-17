import {TasksStateType} from "../../app/App";
import {AddTodolistAC, TodolistDomainType, todolistReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState:TasksStateType = {}
    const startTodolistState:Array<TodolistDomainType> = []

    const action = AddTodolistAC({
        id: '',
        title: "title no matter",
        addedDate: '',
        order: 0,
    })

    const endTasksState = tasksReducer(startTasksState,action)
    const endTodolistsState = todolistReducer(startTodolistState,action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})