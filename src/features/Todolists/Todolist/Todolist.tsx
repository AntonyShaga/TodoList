import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditabelSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Tasks} from "./Task/Tasks";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTaskstTC} from "../tasks-reducer";

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    chengeStatus: (tasksId: string, status:TaskStatuses, todolistId: string) => void
    chengeTaskTitle: (tasksId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    chengeTodolistTitle: (todolistId: string, newTitle: string) => void
}
export const Todolist = React.memo(function (props: PropsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTaskstTC(props.id))
    },[])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const chengeTodolistTitle = useCallback((newTitle: string) => {
        props.chengeTodolistTitle(props.id, newTitle)
    }, [props.chengeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodoList = props.tasks
    console.log(props.tasks)
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }
    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(el => el.status === TaskStatuses.New)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={chengeTodolistTitle}/>
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    tasksForTodoList.map(el =>
                        <Tasks key={el.id} chengeStatus={props.chengeStatus} chengeTaskTitle={props.chengeTaskTitle}
                               removeTask={props.removeTask} el={el} todolistId={props.id}/>
                    )
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"}
                        variant={props.filter === 'active' ? "contained" : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"}
                        variant={props.filter === 'completed' ? "contained" : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})

