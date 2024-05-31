import { TodolistDomainType, todolistsAction, todolistsReducer, todolistThunk } from "./todolists-reducer";
import { tasksReducer, TasksStateType } from "./tasks-reducer";
import { TodolistTypeAPI } from "features/TodolistsList/todolists.api";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const tolist: TodolistTypeAPI = {
    id: "todolistId1",
    addedDate: "",
    order: 0,
    title: "New Todolist",
  };
  const action = todolistThunk.addTodolist.fulfilled({ todolist: tolist }, "", "New Todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
