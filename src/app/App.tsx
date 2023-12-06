import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {BrowserRouter,Routes,Route} from "react-router-dom";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status)
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
                        <Button color={"inherit"}>Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                        <Routes>
                            <Route path={"/Login"} element={ <Login/>}/>
                            <Route path={"/"} element={ <TodolistsList demo={demo}/>}/>
                        </Routes>
                </Container>
            </div>
        </BrowserRouter>

    );
}

export default App;
