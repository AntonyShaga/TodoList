import {
  FilterValuesType,
  TodolistDomainType,
  todolistsAction,
  todolistsReducer,
  todolistThunk,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import { v1 } from "uuid";

import { RequestStatusType } from "app/app-reducer";
import { TodolistTypeAPI } from "features/TodolistsList/api/todolists/todolists.api.types";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", order: 0, addedDate: "" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(
    startState,
    todolistThunk.removeTodolist.fulfilled({ todolistId: todolistId1 }, "", ""),
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const tolist: TodolistTypeAPI = {
    id: "todolistId1",
    addedDate: "",
    order: 0,
    title: "New Todolist",
  };
  const endState = todolistsReducer(
    startState,
    todolistThunk.addTodolist.fulfilled({ todolist: tolist }, "", "New Todolist"),
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(tolist.title);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const action = todolistThunk.changeTodolistTitle.fulfilled(
    {
      todolistId: todolistId2,
      title: newTodolistTitle,
    },
    "",
    { todolistId: todolistId2, title: newTodolistTitle },
  );

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const action = todolistsAction.changeTodolistFilter({ todolistId: todolistId2, filter: newFilter });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("todolist should be added", () => {
  const action = todolistThunk.fetchTodolist.fulfilled({ todolist: startState }, "");
  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
test("correct antity status of todolist should be changed", () => {
  const newStatus: RequestStatusType = "loading";
  const action = todolistsAction.setEntityStatus({ todolistId: todolistId2, entityStatus: newStatus });
  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
