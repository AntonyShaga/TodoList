import React from "react";
import { Task } from "features/TodolistsList/ui/Todolist/Tasks/Task/Task";
import { TaskStatuses } from "common/enums";
import { TodolistDomainType } from "features/TodolistsList/model/todolists/todolistsSlice";
import { useSelector } from "react-redux";
import { selectTasks } from "features/TodolistsList/model/tasks/tasks.selectors";

type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = ({ todolist }: Props) => {
  const { id, filter, entityStatus } = todolist;

  let tasks = useSelector(selectTasks);

  let task = tasks[id];

  if (filter === "active") {
    task = task.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    task = task.filter((t) => t.status === TaskStatuses.Completed);
  }
  return (
    <>
      {task.map((t) => {
        return <Task key={t.id} task={t} todolistId={id} entityStatus={entityStatus} />;
      })}
    </>
  );
};
