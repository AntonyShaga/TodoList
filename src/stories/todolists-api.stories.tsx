import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'TESTdd'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'f110b744-2e4c-4396-b031-bfc5d4e94c87'

    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'd3d34293-1e37-4fb6-9aa0-a0ad0afd81d1'
    const title = 'SLD1'

    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'd3d34293-1e37-4fb6-9aa0-a0ad0afd81d1'
    useEffect(() => {
        taskAPI.getTasks(todolistId).then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'd3d34293-1e37-4fb6-9aa0-a0ad0afd81d1'
    const title = 'TESTdd'
    useEffect(() => {
        taskAPI.createTask(todolistId,title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'd3d34293-1e37-4fb6-9aa0-a0ad0afd81d1'
    const taskId = '46a9f6ba-8ba6-449d-bd5a-ff7dde00f7e5'
    const title = 'RRRRRRRRRRRRRRRRRRRRRR'
    const task = {
        description: '',
        title: 'juce',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
        id:"1" ,
        todoListId: "todolistId2",
        order: 0,
        addedDate: '',
    }

    useEffect(() => {
        taskAPI.updateTask(todolistId,taskId, task)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const Deleteask = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'd3d34293-1e37-4fb6-9aa0-a0ad0afd81d1'
    const taskId = '46a9f6ba-8ba6-449d-bd5a-ff7dde00f7e5'

    useEffect(() => {
        taskAPI.deleteTask(todolistId,taskId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}