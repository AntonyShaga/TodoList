import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolist-api";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReduser() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        /*[todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true, },
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]*/
    });

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(id,todolistId))
    },[dispatchTasks])

    const addTask = useCallback((title: string, todolistId: string) => {
        //dispatchTasks(addTaskAC(title))
    },[dispatchTasks])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatchTasks(changeTaskStatusAC(id,status,todolistId))
    },[dispatchTasks])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatchTasks(changeTaskTitleAC(id,newTitle,todolistId))
    },[dispatchTasks])


    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId,value))
    },[dispatchTodolists])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatchTodolists(action)
        dispatchTasks(action)
    },[dispatchTasks,dispatchTodolists])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(id,title))
    },[dispatchTasks])

    const addTodolist = useCallback((title: string) => {
        //const action = addTodolistAC(title)
       // dispatchTodolists(action)
       // dispatchTasks(action)
    },[dispatchTasks,dispatchTodolists])

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                         /*   if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }*/

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    {/*<Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        //tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />*/}
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

