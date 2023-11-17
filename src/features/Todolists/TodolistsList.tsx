import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {
    AddTodolistTC,
    ChangaTodolistFilterAC,
    ChangaTodolistTitleTC,
    fetchTodolistTC,
    FilterValuesType,
    RemoveTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";

export const TodolistsList: React.FC = React.memo( () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolist)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [])

    const chengeStatus = useCallback((tasksId: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(tasksId, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const chengeTaskTitle = useCallback((tasksId: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(tasksId, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = ChangaTodolistFilterAC(value, todolistId)
        dispatch(action)
    }, [])

    const chengeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = ChangaTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = RemoveTodolistTC(todolistId)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = AddTodolistTC(title)
        dispatch(thunk)
    }, [])

    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map((tl) => {
                        let allTodoListTasks = tasksObj[tl.id];
                        let tasksForTodoList = allTodoListTasks
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
        </>

    )
})