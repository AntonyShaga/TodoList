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
import {Navigate, Route, Routes} from "react-router-dom";
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
                    <Route path={'TodoList/'} element={ <TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404 : PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

