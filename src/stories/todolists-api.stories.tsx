import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}



const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "044ec9dc-0b7b-4a82-9dda-ff56e7fcaefd"
    }
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistsAPI.getTodolists()
            .then((res) => {
                //debugger;
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")

    const update = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"title"} type="text" value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
                <button onClick={update}>add todolist</button>
            </div>
        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <button onClick={deleteTodolist}>delete task</button>
            </div>
        </div>

    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const update = () => {
        todolistsAPI.updateTodolist(todolistId,title)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <input placeholder={"title"} type="text" value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
                <button onClick={update}>update todolist</button>
            </div>
        </div>

    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <button onClick={getTasks}>Get tasks</button>
            </div>
        </div>

    )
};

export const DeletTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <input placeholder={"taskId"} type="text" value={taskId} onChange={(e)=> setTaskId(e.currentTarget.value)}/>
                <button onClick={deleteTask}>delete task</button>
            </div>
        </div>
    )
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [taskId, setTask] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)


    const update = () => {
        todolistsAPI.updateTask(todolistId,taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: '',
        })
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <input placeholder={"Task title"} type="text" value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
                <input placeholder={"Description"} type="text" value={description} onChange={(e)=> setDescription(e.currentTarget.value)}/>
                <input placeholder={"taskId"} type="text" value={taskId} onChange={(e)=> setTask(e.currentTarget.value)}/>
                <input placeholder={"Status"} type="text" value={status} onChange={(e)=> setStatus(+e.currentTarget.value)}/>
                <input placeholder={"Priority"} type="text" value={priority} onChange={(e)=> setPriority(+e.currentTarget.value)}/>
                <input type="checkbox" checked={completed} onClick={()=> setCompleted(completed ? false : true)}/>

                <button onClick={update}>update todolist</button>
            </div>
        </div>

    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")

    const createTask = () => {
        todolistsAPI.createTask(todolistId,taskTitle)
            .then((res) => {
                //debugger;
                setState(res.data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input placeholder={"title"} type="text" value={taskTitle} onChange={(e)=> setTaskTitle(e.currentTarget.value)}/>
                <input placeholder={"todolistId"} type="text" value={todolistId} onChange={(e)=> setTodolistId(e.currentTarget.value)}/>
                <button onClick={createTask}>create task</button>
            </div>
        </div>
    )
}
