import React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import { Menu } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { authThunk } from "features/auth/model/auth-reducer";
import AppBar from "@mui/material/AppBar";
import { useActions } from "common/hooks/useActions";

type Props = {
  isLoggetIn: boolean;
};
export const AppHeader = ({ isLoggetIn }: Props) => {
  const { logOut } = useActions(authThunk);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggetIn && (
            <Button onClick={logOut} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
