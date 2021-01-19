import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ToDo } from './todo.model';
import * as TodoActions from './todo.action';
import { createReducer, on } from '@ngrx/store';

export interface State extends EntityState<ToDo> { }
export const adapter: EntityAdapter<ToDo> = createEntityAdapter<ToDo>();
export let initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(TodoActions.LoadTodos, state => state),
  on(TodoActions.LoadTodosSuccess,
    (state, action) => adapter.setAll(action.todos, state)
  ),
  on(TodoActions.AddTodo,
    (state, action) => adapter.addOne(action.todo, state)
  ),
  on(TodoActions.UpdateTodo,
    (state, action) => adapter.updateOne(action.todo, state)
  ),
  on(TodoActions.DeleteTodo,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TodoActions.HttpErrorResponse, (state, error: Error) => {
    console.error(error);
    return { ...state, ToDoError: error };
  })
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
