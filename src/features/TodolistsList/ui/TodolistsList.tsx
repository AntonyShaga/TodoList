import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist";
import { todolistThunk } from "features/TodolistsList/model/todolists/todolistsSlice";
import { Navigate } from "react-router-dom";
import { AddItemForm } from "common/components";
import { selectTodolists } from "features/TodolistsList/model/todolists/todolists.selectors";
import { useSelector } from "react-redux";
import { selectIsLogetIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks/useActions";
import s from "./TodolistsList.module.css";

export const TodolistsList: React.FC = () => {
  const todolists = useSelector(selectTodolists);
  const isLoggetIn = useSelector(selectIsLogetIn);
  const { fetchTodolist, addTodolist } = useActions(todolistThunk);

  useEffect(() => {
    if (!isLoggetIn) return;
    fetchTodolist();
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    addTodolist(title);
  }, []);

  if (!isLoggetIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Grid container className={s.gridContainer}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper className={s.paperContainer}>
                <Todolist todolist={tl} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
