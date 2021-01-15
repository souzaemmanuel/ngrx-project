import { EntityState } from '@ngrx/entity';
export interface ToDo {
  id: number;
  completed: boolean;
  text: string;  
}
export interface ToDos {
  todos: EntityState<ToDo>;
}