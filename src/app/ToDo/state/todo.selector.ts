import { createSelector } from "@ngrx/store";
import { TodosState } from ".";

const getTodos = (state: TodosState): any => state.todos;

export const getAllTodos = createSelector(
  (state: {todos: TodosState}) => state.todos,
  getTodos
);
