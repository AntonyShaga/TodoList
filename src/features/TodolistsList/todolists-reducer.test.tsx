import { FilterValuesType, TodolistDomainType, todolistsAction, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistTypeAPI } from "common/api/todolist-api";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", order: 0, addedDate: new Date() },
    { id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", order: 0, addedDate: new Date() },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, todolistsAction.removeTodolists({ todolistId: todolistId1 }));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const tolist: TodolistTypeAPI = {
    id: "todolistId1",
    addedDate: new Date(),
    order: 0,
    title: "New Todolist",
  };
  const endState = todolistsReducer(startState, todolistsAction.addTodolist({ todolist: tolist }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(tolist.title);
  expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const action = todolistsAction.changeTodolistTitle({ todolistId: todolistId2, title: newTodolistTitle });

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
