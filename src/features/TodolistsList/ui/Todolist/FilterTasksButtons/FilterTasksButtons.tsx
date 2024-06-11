import React, { useCallback } from "react";
import { ButtonMemo } from "common/components";
import { useActions } from "common/hooks/useActions";
import { FilterValuesType, todolistsAction } from "features/TodolistsList/model/todolists/todolistsSlice";

type Props = {
  todolistId: string;
  filter: FilterValuesType;
};
export const FilterTasksButtons = ({ filter, todolistId }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsAction);
  const changeFilter = (id: string, filter: FilterValuesType) => {
    changeTodolistFilter({ todolistId: id, filter });
  };
  const onAllClickHandler = useCallback(() => changeTodolistFilter({ todolistId, filter: "all" }), [todolistId]);
  const onActiveClickHandler = useCallback(() => changeTodolistFilter({ todolistId, filter: "active" }), [todolistId]);
  const onCompletedClickHandler = useCallback(
    () => changeTodolistFilter({ todolistId, filter: "completed" }),
    [todolistId],
  );
  return (
    <>
      <ButtonMemo variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"success"}>
        ALL
      </ButtonMemo>
      <ButtonMemo
        variant={filter === "active" ? "outlined" : "text"}
        onClick={onActiveClickHandler}
        color={"secondary"}
      >
        Active
      </ButtonMemo>
      <ButtonMemo
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={onCompletedClickHandler}
        color={"primary"}
      >
        Completed
      </ButtonMemo>
    </>
  );
};
