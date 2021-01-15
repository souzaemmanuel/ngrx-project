import { EntityState } from '@ngrx/entity';
export class ToDo {
  public id: number;
  public completed: boolean;
  public text: string;

  constructor(_text: string, _completed: boolean = false, _id?: number) {
    //If not comes id, create a random one
    this.id = _id ? _id : Math.floor(Math.random() * 100);
    this.completed = _completed;
    this.text = _text;
  }
}
export interface ToDos {
  todos: EntityState<ToDo>;
}

