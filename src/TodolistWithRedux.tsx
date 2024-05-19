import React, {memo, useCallback, useEffect} from 'react';
import {TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSellector} from "./state/store";
import {addTaskTC, getTasksTC} from "./state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC,
    removeTodolistAC,
    removeTodolistsTC
} from "./state/todolists-reducer";
import {ButtonMemo} from "./ButtonMemo";
import {TaskWithRedux} from "./TaskWithRedux";
import {TaskStatuses, TaskTypeAPI} from "./api/todolist-api";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
   todolist:TodolistType
}

export const TodolistWithRedux = memo(({todolist}: PropsType) => {

    const {id,filter,title} = todolist

    let tasks  = useAppSellector<TaskTypeAPI[]>(state => state.tasks[id])

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTasksTC(id))
    },[])

    const addTask = useCallback( (title: string) => {
        dispatch(addTaskTC(id,title))
    },[dispatch,id])

    const removeTodolist = () => {
        dispatch(removeTodolistsTC(id))
    }
    const changeTodolistTitle = useCallback( (title: string) => {
        dispatch(changeTodolistTitleTC(id,title))
    },[dispatch,id])

    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id,"all")),[dispatch])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id,"active")),[]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(id,"completed")),[]);

    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <TaskWithRedux key={t.id} task={t} todolistID={id}/>
                })
            }
        </div>
        <div>
            <ButtonMemo variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'success'} >ALL
            </ButtonMemo>
            <ButtonMemo variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'secondary'} >Active
            </ButtonMemo>
            <ButtonMemo variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'primary'} >Completed
            </ButtonMemo>
        </div>
    </div>
})



