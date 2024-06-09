import React, { memo, useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsAction,
  todolistThunk,
} from "features/TodolistsList/model/todolists/todolistsSlice";
import { Task } from "features/TodolistsList/ui/Todolist/Task/Task";
import { TaskStatuses } from "common/enums/enums";
import { AddItemForm, ButtonMemo, EditableSpan } from "common/components";
import { tasksThunk } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks/useActions";
import { useSelector } from "react-redux";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";
import { TaskType } from "features/TodolistsList/api/tasks/tasks.api.types";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = memo(({ todolist }: Props) => {
  const { id, filter, title, entityStatus } = todolist;
  const { fetchTasks, addTask } = useActions(tasksThunk);
  const { changeTodolistFilter } = useActions(todolistsAction);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistThunk);

  useEffect(() => {
    fetchTasks(id);
  }, []);
  let tasks = useSelector(selectTasks);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ todolistId: id, title });
    },
    [id],
  );

  const changeFilter = (id: string, filter: FilterValuesType) => {
    changeTodolistFilter({ todolistId: id, filter });
  };

  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistId: id, title });
  };

  const onAllClickHandler = useCallback(
    () => changeTodolistFilter({ todolistId: id, filter: "all" }),
    [changeFilter, id],
  );
  const onActiveClickHandler = useCallback(
    () => changeTodolistFilter({ todolistId: id, filter: "active" }),
    [changeFilter, id],
  );
  const onCompletedClickHandler = useCallback(
    () => changeTodolistFilter({ todolistId: id, filter: "completed" }),
    [changeFilter, id],
  );

  let task: TaskType[] = tasks[id];

  if (filter === "active") {
    task = task.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    task = task.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm disabled={entityStatus == "loading"} addItem={addTaskCallback} />
      <div>
        {task.map((t) => {
          return <Task key={t.id} task={t} todolistId={id} entityStatus={entityStatus} />;
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
});
