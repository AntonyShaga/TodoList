import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch, useAppSellector} from "../../app/store";
import {
    addTodolistsTC, changeTodolistFilterAC,
    changeTodolistTitleTC, FilterValuesType,
    removeTodolistsTC, setTodolistsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {AddItemForm} from "../../common/components/AddItemForm/AddItemForm";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../common/api/todolist-api";
import {Navigate} from "react-router-dom";

export const TodolistsList: React.FC = () => {
    const todolists = useAppSellector<Array<TodolistDomainType>>(state => state.todolists)
    const isLoggetIn = useAppSellector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!isLoggetIn) return
        dispatch(setTodolistsTC())
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [])

    const changeStatus = useCallback((todolistId: string, status: TaskStatuses, taskId: string) => {
        dispatch(updateTaskTC(todolistId, {status}, taskId))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, newTitle: string, taskId: string) => {
        dispatch(updateTaskTC(todolistId, {title: newTitle}, taskId))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistsTC(todolistId))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [])

    const changeFilter = useCallback(function (id: string, filter: FilterValuesType) {
        changeTodolistFilterAC(id, filter);
    }, []);

    if (!isLoggetIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    );
};
