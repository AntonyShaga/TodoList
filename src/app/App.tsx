import React, {useEffect} from 'react';
import './App.css';
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import {Menu} from "@mui/icons-material";
import {setTodolistsTC,} from "../state/todolists-reducer";
import {useAppDispatch, useAppSellector} from "./store";
import {TaskTypeAPI} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {logOutTC, meTC} from "../features/Login/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";


export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
    [key: string]: Array<TaskTypeAPI>
}

export function App() {
    const status = useAppSellector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSellector<boolean>(state => state.app.isInitialized)
    const isLoggetIn = useAppSellector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(meTC())
    }, [])

if(!isInitialized) {
    return <div style={{position:'fixed',top:'30%', textAlign:'center',width:'100%'}}>
        <CircularProgress/>
    </div>
}
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
                    {isLoggetIn && <Button onClick={logOut} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
            {
                status === 'loading' && <LinearProgress color="secondary"/>
            }

            <Container fixed>
                <ErrorSnackbar/>
                <Routes>
                    <Route path={'TodoList/'} element={<TodolistsList/>}/>
                    <Route path={'TodoList/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404 : PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

