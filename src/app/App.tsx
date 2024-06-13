import React, { useEffect } from "react";
import "app/App.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { selectIsInitialized, selectIsLogetIn } from "features/auth/model/auth.selectors";
import { useSelector } from "react-redux";
import { authThunk } from "features/auth/model/auth-reducer";
import { selectAppStatus } from "app/app-selectors";
import { AppHeader } from "app/AppBar";
import { useActions } from "common/hooks/useActions";
import s from "./App.module.css";
import { AppRoute } from "app/AppRoute";

export function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggetIn = useSelector(selectIsLogetIn);
  const { initializeApp } = useActions(authThunk);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className={s.circularProgress}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="App">
      <AppHeader isLoggetIn={isLoggetIn} />
      {status === "loading" && <LinearProgress color="secondary" />}

      <Container fixed>
        <ErrorSnackbar />
        <AppRoute />
      </Container>
    </div>
  );
}
