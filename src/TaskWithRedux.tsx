import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskTC, updateTaskStatusTC} from "./state/tasks-reducer";
import {TaskType} from "./TodolistWithRedux";
import {useAppDispatch} from "./state/store";
import {TaskStatuses, TaskTypeAPI} from "./api/todolist-api";

type TaskPropsType = {
    task: TaskTypeAPI,
    todolistID: string
}
export const TaskWithRedux: FC<TaskPropsType> = memo((
    {
        task,
        todolistID,
    }
) => {
    const dispatch = useAppDispatch()

    const {id, title, status} = task
    const onClickHandler = () => dispatch(removeTaskTC(todolistID, task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const newStatus = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskStatusTC(todolistID, id, newStatus))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistID))
    }, [dispatch, id, todolistID])

    return <div key={id} className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
});