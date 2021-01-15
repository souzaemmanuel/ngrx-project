import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ToDo } from './todo.model';

export enum ActionTypes {
  LoadTodos = '[Todo] Load Todos',
  AddTodo = '[Todo] Add Todo',
  UpdateTodo = '[Todo] Update Todo',
  DeleteTodo = '[Todo] Delete Todo',
  Error = '[ToDo] - Error'
}

export const LoadTodos = createAction(
  ActionTypes.LoadTodos,
  props<{ todos: ToDo[] }>()
);

export const AddTodo = createAction(
  ActionTypes.AddTodo,
  props<{ todo: ToDo }>()
);

export const UpdateTodo = createAction(
  ActionTypes.UpdateTodo,
  props<{ todo: Update<ToDo> }>()
);

export const DeleteTodo = createAction(
  ActionTypes.DeleteTodo,
  props<{ id: number }>()
);