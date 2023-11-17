import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditabelSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type TasksPropsType = {
    chengeStatus: (tasksId: string, status:TaskStatuses, todolistId: string) => void
    chengeTaskTitle: (tasksId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    el: TaskType
    todolistId: string
}
export const Tasks = React.memo((props: TasksPropsType) => {
    const onClickHandler = () => props.removeTask(props.el.id, props.todolistId)
    const onChengStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.chengeStatus(props.el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChengTitleHandler = useCallback((newValue: string) => {
        props.chengeTaskTitle(props.el.id, newValue, props.todolistId)
    },[ props.chengeTaskTitle,props.el.id, props.todolistId])
    return (
        <li key={props.el.id} className={props.el.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox checked={props.el.status === TaskStatuses.Completed}
                      onChange={onChengStatusHandler}
            />
            <EditableSpan title={props.el.title} onChange={onChengTitleHandler}/>
            <IconButton onClick={onClickHandler} aria-label="delete" size={"small"}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </li>)
})