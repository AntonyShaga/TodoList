import React, { memo, useCallback, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice";
import { AddItemForm } from "common/components";
import { tasksThunk } from "features/TodolistsList/model/tasks/tasksSlice";
import { useActions } from "common/hooks/useActions";
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = memo(({ todolist }: Props) => {
  const { id, filter, title, entityStatus } = todolist;
  const { fetchTasks, addTask } = useActions(tasksThunk);

  useEffect(() => {
    fetchTasks(id);
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      return addTask({ todolistId: id, title }).unwrap();
    },
    [id],
  );

  return (
    <div>
      <TodolistTitle todolist={todolist} />
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
