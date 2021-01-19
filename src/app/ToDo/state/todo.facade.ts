import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import * as TodoActions from './../state/todo.action'
import { ToDo } from "./todo.model";
import * as todoEntity from './../state/todo.reducer'
import { map } from "rxjs/internal/operators/map";
import { getTodoState, TodosState } from './../state'
import * as  fromStore from "./todo.selector";
@Injectable()
export class ToDoFacade {

    public todo$: Observable<ToDo[]> = this.store.pipe(select('todos'), map(todoEntity.selectAll));

    constructor(private store: Store<TodosState>) {
    }

    public getTasks() {
        this.store.dispatch(TodoActions.LoadTodos())
    }

    public newTask(todo: ToDo) {
        this.store.dispatch(TodoActions.AddTodo({ todo }))
    }

    public checkTask(id, completed) {
        const todo = {
            id,
            changes: {
                completed: !completed,
            },
        }
        this.store.dispatch(TodoActions.UpdateTodo({ todo }))
    }

    public editTask(task: ToDo) {
        const todo = {
            id: task.id,
            changes: {
                completed: task.completed,
                text: task.text
            },
        }

        this.store.dispatch(TodoActions.UpdateTodo({ todo }));
    }

    public removeTodo(id) {
        this.store.dispatch(TodoActions.DeleteTodo({ id }))
    }
}