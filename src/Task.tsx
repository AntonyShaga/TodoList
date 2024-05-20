import React, {ChangeEvent, FC, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {} from "./TodolistWithRedux";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}
export const Task: FC<TaskPropsType> = memo ( (
    {
        task,
        removeTask,
        changeTaskTitle,
        changeTaskStatus
    }
) => {
    const {id, title, isDone} = task
    const onClickHandler = () => removeTask(id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
       changeTaskTitle(id, newValue);
    }


    return <div key={id} className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});