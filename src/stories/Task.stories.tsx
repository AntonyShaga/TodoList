import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {useState} from "react";
import {Task} from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        removeTask: {
            description:'removeTask',
            action: 'clicked'
        },
        changeTaskStatus: {
            description:'changeTaskStatus',
            action: 'clicked'
        },
        changeTaskTitle: {
            description:'changeTaskTitle',
            action: 'clicked'
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        task: {id:'1',title:'StoriBoock',isDone:true},
        /*removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),*/
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = {
    //old version
   /* args: {
        task: {id:'1',title:'StoriBoock',isDone:true},
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    },*/
};
export const TaskIsNotDoneStory: Story = {
    //old version
    args: {
        task: {id:'1',title:'StoriBoock',isDone:false},
    },
};
const TaskToogle = () => {
    const [task,setTask] = useState({id:'1',title:'StoriBoock',isDone:true})

    return <Task
        task={task}
        removeTask={action('removeTask')}
        changeTaskStatus={()=>setTask({...task,isDone: !task.isDone})}
        changeTaskTitle={(__,newTitle)=>setTask({...task,title:newTitle})}/>
}

export const TaskStory:Story = {
    render: () => <TaskToogle/>
}