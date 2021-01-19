import { EntityState } from '@ngrx/entity';
export class ToDo {
  public id: number;
  public completed: boolean;
  public text: string;

  constructor(text: string, completed: boolean = false, id?: number) {
    //If not comes id, create a random one
    this.id = id ? id : Math.floor(Math.random() * 100);
    this.completed = completed;
    this.text = text;
  }
}
export interface ToDos {
  todos: EntityState<ToDo>;
}

