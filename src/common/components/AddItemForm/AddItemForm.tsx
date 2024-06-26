import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react";
import { AddBox } from "@mui/icons-material";
import { BaseResponse } from "common/types";

export type Props = {
  addItem: (title: string) => Promise<unknown>;
  disabled?: boolean;
};

export const AddItemForm = memo(({ addItem, disabled }: Props) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title)
        .then(() => {
          setTitle("");
        })
        .catch((e: BaseResponse) => {
          if (e?.resultCode) {
            setError(e.messages[0]);
          }
        });
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (e.charCode === 13) {
      addItemHandler();
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
        disabled={disabled}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
