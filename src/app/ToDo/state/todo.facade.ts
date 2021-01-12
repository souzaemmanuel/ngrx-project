import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import ToDo from "./todo.model";
import ToDoState from "./todo.state";
import * as ToDoActions from '../state/todo.action';
import { Injectable } from "@angular/core";

@Injectable()
export class ToDoFacade {
    todo$: Observable<ToDoState>;
    constructor(private store: Store<{ todos: ToDoState }>) {
        this.todo$ = store.pipe(select('todos'));
    }
    
    createToDo(todo: ToDo) {
        this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    }

    getAllTasks() {
        this.store.dispatch(ToDoActions.BeginGetToDoAction());
    }
}