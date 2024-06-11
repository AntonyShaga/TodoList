import React from "react";
import { ButtonMemo } from "common/components";
import { useActions } from "common/hooks/useActions";
import { FilterValuesType, todolistsAction } from "features/TodolistsList/model/todolists/todolistsSlice";

type Props = {
  todolistId: string;
  filter: FilterValuesType;
};
export const FilterTasksButtons = ({ filter, todolistId }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsAction);

  const changeFilter = (filter: FilterValuesType) => {
    changeTodolistFilter({ todolistId, filter });
  };

  return (
    <>
      <ButtonMemo
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilter("all")}
        color={"success"}
      >
        ALL
      </ButtonMemo>
      <ButtonMemo
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilter("active")}
        color={"secondary"}
      >
        Active
      </ButtonMemo>
      <ButtonMemo
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilter("completed")}
        color={"primary"}
      >
        Completed
      </ButtonMemo>
    </>
  );
};
