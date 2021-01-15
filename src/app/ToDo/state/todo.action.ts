import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { ToDo } from './todo.model';

export enum ActionTypes {
  LoadTodos = '[Todo] Load Todos',
  AddTodo = '[Todo] Add Todo',
  UpsertTodo = '[Todo] Upsert Todo',
  AddTodos = '[Todo] Add Todos',
  UpsertTodos = '[Todo] Upsert Todos',
  UpdateTodo = '[Todo] Update Todo',
  UpdateTodos = '[Todo] Update Todos',
  DeleteTodo = '[Todo] Delete Todo',
  DeleteTodos = '[Todo] Delete Todos',
  ClearTodos = '[Todo] Clear Todos',
  Error = '[ToDo] - Error'
}

let currentId = 1;

export class LoadTodos implements Action {
  readonly type = ActionTypes.LoadTodos;

  constructor(public payload: { todos: ToDo[] }) {}
}

export class AddTodo implements Action {
  readonly type = ActionTypes.AddTodo;

  constructor(public payload: { todo: ToDo }) {
    payload.todo.id = currentId++;
  }
}

export class UpsertTodo implements Action {
  readonly type = ActionTypes.UpsertTodo;

  constructor(public payload: { todo: ToDo }) {}
}

export class AddTodos implements Action {
  readonly type = ActionTypes.AddTodos;

  constructor(public payload: { todos: ToDo[] }) {}
}

export class UpsertTodos implements Action {
  readonly type = ActionTypes.UpsertTodos;

  constructor(public payload: { todos: ToDo[] }) {}
}

export class UpdateTodo implements Action {
  readonly type = ActionTypes.UpdateTodo;

  constructor(public payload: { todo: Update<ToDo> }) {}
}

export class UpdateTodos implements Action {
  readonly type = ActionTypes.UpdateTodos;

  constructor(public payload: { todos: Update<ToDo>[] }) {}
}

export class DeleteTodo implements Action {
  readonly type = ActionTypes.DeleteTodo;

  constructor(public payload: { id: number }) {}
}

export class DeleteTodos implements Action {
  readonly type = ActionTypes.DeleteTodos;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearTodos implements Action {
  readonly type = ActionTypes.ClearTodos;
}

export type TodoActions = LoadTodos | AddTodo | UpsertTodo | AddTodos | UpsertTodos | UpdateTodo | UpdateTodos | DeleteTodo | DeleteTodos | ClearTodos;