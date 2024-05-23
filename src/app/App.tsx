import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {Menu} from "@mui/icons-material";
import {addTodolistsTC, setTodolistsTC, TodolistDomainType,} from "../state/todolists-reducer";
import {useAppDispatch, useAppSellector} from "./store";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {TaskTypeAPI} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";



export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskTypeAPI>
}

export function App() {

    const status = useAppSellector<RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setTodolistsTC())
    }, [])
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
            {
                status === 'loading' && <LinearProgress color="secondary"/>
            }

            <Container fixed>
                <ErrorSnackbar/>
                <Routes>
                    <Route path={'/'} element={ <TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

