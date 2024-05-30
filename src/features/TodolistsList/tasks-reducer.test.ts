import { tasksActions, tasksReducer, TasksStateType, tasksThunk } from "./tasks-reducer";
import { todolistsAction } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses } from "common/enums/enums";

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = tasksThunk.removeTask.fulfilled({ taskId: "2", todolistId: "todolistId2" }, "reqestId", {
    taskId: "2",
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy();
});
test("correct task should be added to correct array", () => {
  const task = {
    description: "",
    title: "juce",
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    id: "1",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
  };
  const action = tasksThunk.addTask.fulfilled({ task: task }, "reqestId", {
    todolistId: task.todoListId,
    title: task.title,
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(0);
});
test("status of specified task should be changed", () => {
  const task = {
    description: "",
    title: "juce",
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    id: "1",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
  };
  const action = tasksThunk.updateTask.fulfilled({ taskId: "2", domainModel: task, todolistId: "todolistId2" }, "p", {
    taskId: "2",
    domainModel: task,
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test("title of specified task should be changed", () => {
  const task = {
    description: "",
    title: "yogurt",
    status: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    id: "1",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
  };
  const action = tasksThunk.updateTask.fulfilled({ taskId: "2", domainModel: task, todolistId: "todolistId2" }, "p", {
    taskId: "2",
    domainModel: task,
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});
test("new array should be added when new todolist is added", () => {
  const action = todolistsAction.addTodolist({
    todolist: {
      id: "someId",
      addedDate: "",
      order: 0,
      title: "new todolist",
    },
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("propertry with todolistId should be deleted", () => {
  const action = todolistsAction.removeTodolists({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
test("empty arrays should be add when we set todolist", () => {
  const action = todolistsAction.setTodoList({
    todolist: [
      { id: "1", title: "newTitle", order: 0, addedDate: "" },
      { id: "2", title: "newTitle", order: 0, addedDate: "" },
    ],
  });
  const endState = tasksReducer({}, action);
  const key = Object.keys(endState);

  expect(key.length).toBe(2);
  expect(endState["1"]).toBeDefined();
  expect(endState["2"]).toBeDefined();
});
test("task should be add to todolist", () => {
  const action = tasksThunk.fetchTasks.fulfilled(
    { tasks: startState["todolistId1"], todolistId: "todolistId1" },
    "requestId",
    "todolistId1",
  );
  const endeState = tasksReducer({ todolistId2: [], todolistId1: [] }, action);

  expect(endeState["todolistId1"].length).toBe(3);
  expect(endeState["todolistId2"].length).toBe(0);
});
