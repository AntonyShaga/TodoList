import {action} from '@storybook/addon-actions'
import React from "react";
import {Tasks} from "./Tasks";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

export default {
    title:'Task Component',
    component:Tasks,
}
const chengeTaskTitle = action("Title changed")
const chengeStatus = action("Status changed")
const removeTask = action("Task remove")
export const TasksBaseExample = () => {
    return(
        <>
            <Tasks chengeStatus={chengeStatus} chengeTaskTitle={chengeTaskTitle}
                   removeTask={removeTask} el={{id: '1',  title: 'CSS', status: TaskStatuses.Completed,todoListId:"todolistId1",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low}} todolistId={'todolistId1'}/>
            <Tasks chengeStatus={chengeStatus} chengeTaskTitle={chengeTaskTitle}
                   removeTask={removeTask} el={{id: '2', title: 'JS',status: TaskStatuses.New,todoListId:"todolistId2",description:'',
                startDate:'',deadline:'', addedDate:'', order:0, priority: TaskPriorities.Low}} todolistId={'todolistId2'}/>
        </>

    )
}