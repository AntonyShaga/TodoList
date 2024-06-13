import React, { ChangeEvent, memo } from "react";
import { Checkbox } from "@mui/material";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TaskStatuses } from "common/enums/enums";
import { RequestStatusType } from "app/app-reducer";
import { Tasks } from "features/TodolistsList/api/tasks/tasks.api.types";
import { useActions } from "common/hooks/useActions";
import { tasksThunk } from "features/TodolistsList/model/tasks/tasksSlice";
import s from "features/TodolistsList/ui/Todolist/Tasks/Task/Task.module.css";

type Props = {
  task: Tasks;
  todolistId: string;
  entityStatus: RequestStatusType;
};
export const Task = memo(({ task, todolistId, entityStatus }: Props) => {
  const { id, title, status } = task;
  const { removeTask, updateTask } = useActions(tasksThunk);
  const removeTaskHandler = () => removeTask({ todolistId: todolistId, taskId: task.id });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;

    updateTask({ todolistId: todolistId, domainModel: { status }, taskId: id });
  };
  const onTitleChangeHandler = (newValue: string) => {
    updateTask({ todolistId: todolistId, domainModel: { title: newValue }, taskId: id });
  };
  return (
    <div key={id} className={status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox checked={status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />
      <EditableSpan value={title} onChange={onTitleChangeHandler} />
      <IconButton onClick={removeTaskHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  );
});
