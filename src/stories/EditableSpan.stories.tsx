import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import {AddBox} from "@mui/icons-material";
import {EditableSpan} from "../EditableSpan";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        value: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    //args: {onClick: fn()},
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {
    /*args: {
        onChange: action('Value EditableSpan changed')
    }*/
};
