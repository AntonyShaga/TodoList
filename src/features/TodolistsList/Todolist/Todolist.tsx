import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSellector} from "../../../app/store";
import {addTaskTC, getTasksTC} from "../../../state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistsTC,
    TodolistDomainType
} from "../../../state/todolists-reducer";
import {ButtonMemo} from "../../../ButtonMemo";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskTypeAPI} from "../../../api/todolist-api";


type PropsType = {
    todolist: TodolistDomainType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    addTask:(todolistId:string,title:string) => void
    removeTask:(todolistId:string,title:string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = memo((
    {
        todolist,
        removeTodolist,
        changeTodolistTitle,
        addTask,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
    }
) => {

    const {id, filter, title, entityStatus} = todolist

    let tasks = useAppSellector<TaskTypeAPI[]>(state => state.tasks[id])

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTasksTC(id))
    }, [])

    const addTaskHandler = (title:string) => {
        addTask(id,title)
    }

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const changeTodolistTitleHandler = (title:string) => {
        changeTodolistTitle(id,title)
    }

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "all")), [dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "active")), []);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id, "completed")), []);

    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm disabled={entityStatus == 'loading'} addItem={addTaskHandler}/>
        <div>
            {
                tasks.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        todoListId={id}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </div>
        <div>
            <ButtonMemo variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'success'}>ALL
            </ButtonMemo>
            <ButtonMemo variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'secondary'}>Active
            </ButtonMemo>
            <ButtonMemo variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'primary'}>Completed
            </ButtonMemo>
        </div>
    </div>
})



