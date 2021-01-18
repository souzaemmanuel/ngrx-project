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

    public todo$: Observable<any>;
    // todo$: Observable<any[]> = this.store.select(state => state.todos, map(res => {todoEntity.selectAll}));

    constructor(private _store: Store<TodosState>, private store: Store<{ todos: ToDo[] }>) {
        this.todo$ = _store.pipe(select('todos'), map(todoEntity.selectAll));
    }

    public async getTasks() {
        this._store.dispatch(TodoActions.LoadTodos())
    }

    public async newTask(todo: ToDo) {
        this._store.dispatch(TodoActions.AddTodo({ todo }))
        return;
    }

    public async checkTask(id, completed) {
        const todo = {
            id,
            changes: {
                completed: !completed,
            },
        }
        this._store.dispatch(TodoActions.UpdateTodo({ todo }))
    }

    public async editTask(task: ToDo) {
        const todo = {
            id: task.id,
            changes: {
                completed: task.completed,
                text: task.text
            },
        }

        this._store.dispatch(TodoActions.UpdateTodo({ todo }));
        return;
    }

    public async removeTodo(id) {
        this._store.dispatch(TodoActions.DeleteTodo({ id }))
    }
}