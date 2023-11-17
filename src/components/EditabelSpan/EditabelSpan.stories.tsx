import {action} from '@storybook/addon-actions'
import React from "react";
import {EditableSpan} from "./EditableSpan";

export default {
    title:'EditableSpan Component',
    component:EditableSpan,
}
const onChange = action("Title changed")

export const EditableSpanBaseExample = () => {
    return(
        <>
           <EditableSpan title={'Some title'} onChange={onChange}/>
        </>

    )
}