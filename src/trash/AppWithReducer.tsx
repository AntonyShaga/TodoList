import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from '../features/Todolists/Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangaTodolistFilterAC,
    ChangaTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "../features/Todolists/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../features/Todolists/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type FilterValuesType = "all" | "completed" | "active"

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(
            {
                id: "id exist",
                todoListId: todolistId,
                description: "bl",
                status: TaskStatuses.New,
                priority: 3,
                title: title,
                addedDate: "",
                deadline: '',
                order: 0,
                startDate: ""
            }
        )
        dispatchToTasksReducer(action)
    }

    function chengeStatus(tasksId: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskAC(tasksId, {status}, todolistId)
        dispatchToTasksReducer(action)
    }

    function chengeTaskTitle(tasksId: string, newTitle: string, todolistId: string) {
        const action = updateTaskAC(tasksId, {title: newTitle}, todolistId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangaTodolistFilterAC(value, todolistId)
        dispatchTOTdolistsReducer(action)
    }

    let chengeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = ChangaTodolistTitleAC(todolistId, newTitle)
        dispatchTOTdolistsReducer(action)
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTOTdolistsReducer] = useReducer(todolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ])

    let removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchTOTdolistsReducer(action)
        dispatchToTasksReducer(action)
    }


    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ],
        [todolistId2]: [
            {
                id: v1(), title: "Book", status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
        ]
    })

    function addTodolist(title: string) {
        const action = AddTodolistAC({
            id: v1(),
            title: "title no matter",
            addedDate: '',
            order: 0,
        })
        dispatchTOTdolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id];
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(el => el.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(el => el.status === TaskStatuses.New)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            chengeStatus={chengeStatus}
                                            chengeTaskTitle={chengeTaskTitle}
                                            addTask={addTask}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            chengeTodolistTitle={chengeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
