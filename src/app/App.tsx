import React, { useEffect } from "react";
import "./App.css";
import LinearProgress from "@mui/material/LinearProgress";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import Button from "@mui/material/Button";
import { Menu } from "@mui/icons-material";
import { useAppDispatch } from "./store";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "features/auth/ui/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { TodolistsList } from "features/TodolistsList/TodolistsList";
import CircularProgress from "@mui/material/CircularProgress";
import { selectIsLogetIn } from "features/auth/model/auth.selectors";
import { useSelector } from "react-redux";
import { selectAppStatus, selectIsInitialized } from "app/app-selectors";
import { authThunk } from "features/auth/model/auth-reducer";

export function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggetIn = useSelector(selectIsLogetIn);
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(authThunk.logOut());
  };

  useEffect(() => {
    dispatch(authThunk.initializeApp());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          {isLoggetIn && (
            <Button onClick={logOut} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {status === "loading" && <LinearProgress color="secondary" />}

      <Container fixed>
        <ErrorSnackbar />
        <Routes>
          <Route path={"/"} element={<TodolistsList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1>404 : PAGE NOT FOUND</h1>} />
          <Route path={"*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
    </div>
  );
}
