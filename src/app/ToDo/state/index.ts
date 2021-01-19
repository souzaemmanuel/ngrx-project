import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import { ToDos } from './todo.model';
import * as todos from './todo.reducer';

export * from './todo.selector';
export * from './todo.facade';
export * from './todo.model';
export * from './todo.action';

export interface TodosState extends ToDos { }

export const reducers: ActionReducerMap<TodosState> = {
    todos: todos.reducer
};

export const getTodoState = createFeatureSelector<TodosState[]>('todos')
