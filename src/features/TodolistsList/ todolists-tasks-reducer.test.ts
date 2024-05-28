import { TodolistDomainType, todolistsReducer } from "./todolists-reducer";
import { tasksReducer, TasksStateType } from "./tasks-reducer";
import { TodolistTypeAPI } from "common/api/todolist-api";
import { todolistsAction } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const tolist: TodolistTypeAPI = {
    id: "todolistId1",
    addedDate: new Date(),
    order: 0,
    title: "New Todolist",
  };
  const action = todolistsAction.addTodolist({ todolist: tolist });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
