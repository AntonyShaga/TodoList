import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm/AddItemForm";
import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import IconButton from "@mui/material/IconButton/IconButton";
import {AddBox} from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Clicked button inside form',
            action: 'Cliced'
        }
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    //args: {onClick: fn()},
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {
    //old version
    /*args: {
       // addItem: action('Clicked button inside form')
    },*/
};

const ErrorAddItemForm: FC<AddItemFormPropsType> = memo((
    {
        addItem
    }
) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is required")

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItemHandler}>
            <AddBox/>
        </IconButton>
    </div>
})
export const ErrorAddItemFormStory: Story = {
    render: () => <ErrorAddItemForm addItem={action('Clicked button inside form')}/>
};