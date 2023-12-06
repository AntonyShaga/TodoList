import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditabelSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Tasks} from "./Task/Tasks";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTaskstTC} from "../tasks-reducer";

type PropsType = {
    todolist:TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    chengeStatus: (tasksId: string, status:TaskStatuses, todolistId: string) => void
    chengeTaskTitle: (tasksId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    chengeTodolistTitle: (todolistId: string, newTitle: string) => void
    demo?:boolean
}
export const Todolist = React.memo(function ({demo = false,...props}: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTaskstTC(props.todolist.id))
    },[])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const chengeTodolistTitle = useCallback((newTitle: string) => {
        props.chengeTodolistTitle(props.todolist.id, newTitle)
    }, [props.chengeTodolistTitle, props.todolist.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    let tasksForTodoList = props.tasks
    console.log(props.tasks)
    if (props.todolist.filter === "completed") {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === "active") {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={chengeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <ul>
                {
                    tasksForTodoList.map(el =>
                        <Tasks key={el.id} chengeStatus={props.chengeStatus} chengeTaskTitle={props.chengeTaskTitle}
                               removeTask={props.removeTask} el={el} todolistId={props.todolist.id}/>
                    )
                }
            </ul>
            <div>
                <Button variant={props.todolist.filter === 'all' ? "contained" : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"}
                        variant={props.todolist.filter === 'active' ? "contained" : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"}
                        variant={props.todolist.filter === 'completed' ? "contained" : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

