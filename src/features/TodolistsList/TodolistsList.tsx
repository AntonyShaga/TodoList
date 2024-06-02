import React, { useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Todolist } from "./Todolist/Todolist";
import { FilterValuesType, todolistsAction, todolistThunk } from "./todolists-reducer";
import { tasksThunk } from "./tasks-reducer";
import { Navigate } from "react-router-dom";
import { TaskStatuses } from "common/enums/enums";
import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { useSelector } from "react-redux";
import { selectIsLogetIn } from "features/auth/model/auth.selectors";
import { useActions } from "common/hooks/useActions";

export const TodolistsList: React.FC = () => {
  const todolists = useSelector(selectTodolists);
  const isLoggetIn = useSelector(selectIsLogetIn);
  const dispatch = useAppDispatch();
  const { fetchTodolist, removeTodolist, addTodolist, changeTodolistTitle } = useActions(todolistThunk);
  const { removeTask, addTask, updateTask } = useActions(tasksThunk);
  useEffect(() => {
    if (!isLoggetIn) return;
    fetchTodolist();
  }, []);

  const addTaskCallback = useCallback((todolistId: string, title: string) => {
    addTask({ todolistId, title });
  }, []);

  const removeTaskCallback = useCallback((todolistId: string, taskId: string) => {
    removeTask({ todolistId, taskId });
  }, []);

  const changeStatus = useCallback((todolistId: string, status: TaskStatuses, taskId: string) => {
    updateTask({ todolistId, domainModel: { status }, taskId });
  }, []);

  const changeTaskTitle = useCallback((todolistId: string, newTitle: string, taskId: string) => {
    updateTask({ todolistId, domainModel: { title: newTitle }, taskId });
  }, []);

  const removeTodolistCallback = useCallback((todolistId: string) => {
    removeTodolist(todolistId);
  }, []);

  const changeTodolistTitleCallback = useCallback((todolistId: string, title: string) => {
    changeTodolistTitle({ todolistId, title });
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    addTodolist(title);
  }, []);

  const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
    dispatch(todolistsAction.changeTodolistFilter({ todolistId: id, filter }));
  }, []);

  if (!isLoggetIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolistCallback} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  removeTodolist={removeTodolistCallback}
                  changeTodolistTitle={changeTodolistTitleCallback}
                  changeFilter={changeFilter}
                  addTask={addTaskCallback}
                  removeTask={removeTaskCallback}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
