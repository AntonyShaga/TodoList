import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/Todolists/Todolist/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValuesType, TodolistDomainType} from "../features/Todolists/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let resultTasks = tasks.filter(el => el.id !== id)
        tasksObj[todolistId] = resultTasks;
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New,todoListId:todolistId,description:'',
            startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low};
        let tasks = tasksObj[todolistId]
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function chengeStatus(tasksId: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === tasksId)
        if (task) {
            task.status = status;
            setTasks({...tasksObj})
        }

    }

    function chengeTaskTitle(tasksId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === tasksId)
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let chengeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }

    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus:'idle',addedDate:'',order:0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate:'',order:0}
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(t => t.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }


    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,todoListId:todolistId1,description:'',
             startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,todoListId:todolistId1,description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},

        ],
        [todolistId2]: [
            {id: v1(), title: "Book", status: TaskStatuses.Completed,todoListId:todolistId2,description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,todoListId:todolistId2,description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low},
        ]
    })

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: "all",
            title: title,
            addedDate:'',
            entityStatus:'idle',
            order: 0
        }
        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
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
                <Grid container style={{padding:"10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container  spacing={3}>
                    {
                        todolists.map((tl) => {
                            let allTasksForTodoList = tasksObj[tl.id];
                            let tasksForTodoList = allTasksForTodoList
                            if (tl.filter === "completed") {
                                tasksForTodoList = allTasksForTodoList.filter(el => el.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === "active") {
                                tasksForTodoList = allTasksForTodoList.filter(el => el.status === TaskStatuses.New)
                            }
                            return (
                                <Grid  item>
                                    <Paper style={{padding:"10px"}}>
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

export default App;
