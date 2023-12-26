import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "./store";
import {initialazedTC, RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {logoutTC} from "../features/Login/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootState, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootState,boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
debugger
    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    },[])
    useEffect(()=>{
        dispatch(initialazedTC())
    },[])
    if (!isInitialized) {
        return <CircularProgress  sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'absolute',
            left: '50%',
            bottom: '50%'
        }}
          size={100}
        />
    }



        return (
        <BrowserRouter>
            <div className="App">
                <CustomizedSnackbars/>
                <AppBar position={"static"}>
                    <Toolbar>
                        <IconButton edge={"start"}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color={"inherit"} onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/Login"} element={<Login/>}/>
                        <Route path={"/TodoList"} element={<TodolistsList demo={demo}/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>

    );
}

export default App;
