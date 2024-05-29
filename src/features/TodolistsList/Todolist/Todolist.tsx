import React, { memo, useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSellector } from "app/store";
import { FilterValuesType, TodolistDomainType } from "../todolists-reducer";
import { Task } from "./Task/Task";
import { tasksThunk } from "features/TodolistsList/tasks-reducer";
import { TaskTypeAPI } from "features/TodolistsList/todolists.api";
import { TaskStatuses } from "common/enums/enums";
import { AddItemForm, ButtonMemo, EditableSpan } from "common/components";

type PropsType = {
  todolist: TodolistDomainType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  changeFilter: (todolistId: string, value: FilterValuesType) => void;
};

export const Todolist: React.FC<PropsType> = memo(
  ({
    todolist,
    removeTodolist,
    changeTodolistTitle,
    addTask,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
    changeFilter,
  }) => {
    const { id, filter, title, entityStatus } = todolist;

    let tasks = useAppSellector<TaskTypeAPI[]>((state) => state.tasks[id]);

    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(tasksThunk.fetchTasks(id));
    }, []);

    const addTaskHandler = useCallback(
      (title: string) => {
        addTask(id, title);
      },
      [addTask, id],
    );

    const removeTodolistHandler = useCallback(() => {
      removeTodolist(id);
    }, [removeTodolist, id]);

    const changeTodolistTitleHandler = useCallback(
      (title: string) => {
        changeTodolistTitle(id, title);
      },
      [changeTodolistTitle, id],
    );

    const onAllClickHandler = useCallback(() => changeFilter(id, "all"), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter(id, "active"), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter(id, "completed"), [changeFilter, id]);

    if (filter === "active") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
      <div>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
          <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm disabled={entityStatus == "loading"} addItem={addTaskHandler} />
        <div>
          {tasks?.map((t) => {
            return (
              <Task
                key={t.id}
                task={t}
                todoListId={id}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
              />
            );
          })}
        </div>
        <div>
          <ButtonMemo variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"success"}>
            ALL
          </ButtonMemo>
          <ButtonMemo
            variant={filter === "active" ? "outlined" : "text"}
            onClick={onActiveClickHandler}
            color={"secondary"}
          >
            Active
          </ButtonMemo>
          <ButtonMemo
            variant={filter === "completed" ? "outlined" : "text"}
            onClick={onCompletedClickHandler}
            color={"primary"}
          >
            Completed
          </ButtonMemo>
        </div>
      </div>
    );
  },
);
