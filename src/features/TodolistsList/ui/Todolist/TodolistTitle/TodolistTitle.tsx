import React from "react";
import { EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { TodolistDomainType, todolistThunk } from "features/TodolistsList/model/todolists/todolistsSlice";
import { useActions } from "common/hooks/useActions";
type Props = {
  todolist: TodolistDomainType;
};
export const TodolistTitle = ({ todolist }: Props) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistThunk);
  const { id, title, entityStatus } = todolist;
  const removeTodolistHandler = () => {
    removeTodolist(id);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle({ todolistId: id, title });
  };

  return (
    <>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </>
  );
};
