import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../../app/store";
import {TaskStatuses, TaskTypeAPI} from "../../../../api/todolist-api";

type TaskPropsType = {
    task: TaskTypeAPI,
    todoListId: string
    removeTask:(todolistId:string,title:string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}
export const Task: FC<TaskPropsType> = memo((
    {
        task,
        todoListId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
    }
) => {
    const dispatch = useAppDispatch()

    const {id, title, status} = task
    const removeTaskHandler = () => removeTask(todoListId, task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        const newStatus = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        changeTaskStatus(todoListId,newStatus,id)
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(todoListId, newValue,id )
    }, [dispatch, id, todoListId])

    return <div key={id} className={status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={changeTaskStatusHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});