import React, { memo } from "react";
import { ButtonProps } from "@mui/material/Button/Button";
import { Button } from "@mui/material";

interface IButtonMemoProps extends ButtonProps {
  children: React.ReactNode;
}
export const ButtonMemo = memo(({ children, ...rest }: IButtonMemoProps) => {
  return <Button {...rest}>{children}</Button>;
});
