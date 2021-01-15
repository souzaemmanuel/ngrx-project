import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ToDo } from './todo.model';
import { ActionTypes, TodoActions } from './todo.action';

export interface State extends EntityState<ToDo> { }
export const adapter: EntityAdapter<ToDo> = createEntityAdapter<ToDo>();
export let initialState: State = adapter.getInitialState();

initialState = adapter.addMany([
  { id: 1, text: 'Check emails 📧', completed: true },
  { id: 2, text: 'Attend meetings 📆', completed: true },
  { id: 3, text: 'Took garbage out 😋', completed: false },
  { id: 4, text: '🤔 Learn ngrx 🤯', completed: false },
  { id: 5, text: 'Do not forget to thank Lukasz for being patient with me 😂😵', completed: false },
], initialState);

export function reducer(
  state = initialState,
  action: TodoActions
): State {
  switch (action.type) {
    case ActionTypes.AddTodo: {
      return adapter.addOne(action.payload.todo, state);
    }

    case ActionTypes.AddTodos: {
      return adapter.addMany(action.payload.todos, state);
    }

    case ActionTypes.UpdateTodo: {
      return adapter.updateOne(action.payload.todo, state);
    }

    case ActionTypes.UpdateTodos: {
      return adapter.updateMany(action.payload.todos, state);
    }

    case ActionTypes.DeleteTodo: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ActionTypes.DeleteTodos: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ActionTypes.LoadTodos: {
      return adapter.addAll(action.payload.todos, state);
    }

    case ActionTypes.ClearTodos: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
