import React, { ChangeEvent, FC, memo, useCallback } from "react";
import { Checkbox } from "@mui/material";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/todolists.api";
import { TaskStatuses } from "common/enums/enums";
import { RequestStatusType } from "app/app-reducer";

type TaskPropsType = {
  task: TaskType;
  todoListId: string;
  entityStatus: RequestStatusType;
  removeTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
};
export const Task: FC<TaskPropsType> = memo(
  ({ task, todoListId, removeTask, changeTaskStatus, changeTaskTitle, entityStatus }) => {
    const { id, title, status } = task;
    const removeTaskHandler = useCallback(() => removeTask(todoListId, task.id), [removeTask, todoListId, task.id]);

    const changeTaskStatusHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const newStatus = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
        changeTaskStatus(todoListId, newStatus, id);
      },
      [changeTaskStatus, todoListId, id],
    );

    const onTitleChangeHandler = useCallback(
      (newValue: string) => {
        changeTaskTitle(todoListId, newValue, id);
      },
      [changeTaskTitle, id, todoListId],
    );
    return (
      <div key={id} className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox checked={status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />
        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={removeTaskHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </div>
    );
  },
);
