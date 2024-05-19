import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {addTodolistAC, addTodolistsTC, setTodolistsTC,} from "./state/todolists-reducer";
import {useAppDispatch, useAppSellector} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {TaskTypeAPI} from "./api/todolist-api";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskTypeAPI>
}

export function AppWithRedux() {
    const todolists = useAppSellector<Array<TodolistType>>(state => state.todolists)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(setTodolistsTC())
    },[])
/*

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id,todolistId))
    },[])

    /!*const  addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title,todolistId))
    },[dispatch])*!/

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id,isDone,todolistId))
    },[])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        console.log(id,newTitle,todolistId)
        dispatch(changeTaskTitleAC(id,newTitle,todolistId))
    },[])


    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId,value))
    },[])

    const removeTodolist = useCallback((id: string) => {
        const action =removeTodolistAC(id)
        dispatch(action)
    },[])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id,title))
    },[])*/

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    },[])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithRedux
                                       todolist={tl}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

