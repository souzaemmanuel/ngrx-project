import {ActionReducerMap} from '@ngrx/store';
import { ToDos } from './todo.model';
import * as todos from './todo.reducer';

export interface TodosState extends ToDos { }

export const reducers: ActionReducerMap<TodosState> = {
    todos: todos.reducer
};
