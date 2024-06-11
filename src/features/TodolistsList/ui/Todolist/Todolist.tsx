import React, { memo, useCallback, useEffect } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType, todolistThunk } from "features/TodolistsList/model/todolists/todolistsSlice";
import { AddItemForm, EditableSpan } from "common/components";
import { tasksThunk } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks/useActions";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = memo(({ todolist }: Props) => {
  const { id, filter, title, entityStatus } = todolist;
  const { fetchTasks, addTask } = useActions(tasksThunk);
  const { removeTodolist, changeTodolistTitle } = useActions(todolistThunk);

  useEffect(() => {
    fetchTasks(id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      addTask({ todolistId: id, title });
    },
    [id],
  );
  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistId: id, title });
  };

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
        <Tasks todolist={todolist} />
      </div>
      <div>
        <FilterTasksButtons todolistId={id} filter={filter} />
      </div>
    </div>
  );
});
