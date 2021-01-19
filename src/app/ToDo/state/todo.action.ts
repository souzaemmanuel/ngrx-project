import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { ToDo } from './todo.model';

export const LoadTodos = createAction(
  '[Todo] Load Todos'
);

export const LoadTodosSuccess = createAction(
  '[Todo] Success to Load Todos',
  props<{ todos: ToDo[] }>()
);

export const AddTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: ToDo }>()
);

export const UpdateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Update<ToDo> }>()
);

export const DeleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const HttpErrorResponse = createAction('[ToDo] - Error', props<Error>());