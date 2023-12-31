import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import { IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFopmPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem,disabled = false}: AddItemFopmPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("")
        } else {
            setError("Field is required")
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addTask();
        }
    }
    return <div>
        <TextField value={title}
                   disabled={disabled}
                   variant={"outlined"}
                   label={'Type value'}
                   helperText={error}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
        />
        <IconButton onClick={addTask} color={"primary"} disabled={disabled}>
            <ControlPoint/>
        </IconButton>
    </div>
})