import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo ((props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState("")
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode ? <TextField onChange={onChangeTitleHandler} autoFocus onBlur={activateViewMode} value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})