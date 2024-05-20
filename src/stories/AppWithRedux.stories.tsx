import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm/AddItemForm";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import {AddBox} from "@mui/icons-material";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {AppWithRedux} from "../app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../app/store";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes

   decorators:[ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AppWithReduxStory: Story = {}
