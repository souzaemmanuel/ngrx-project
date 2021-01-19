import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ToDo } from '.';
import * as ToDoActions from './todo.action';
import { TodoService } from './todo.service';

@Injectable()
export class ToDoEffects {
    constructor(private todoService: TodoService, private action$: Actions) { }

    GetToDos$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(ToDoActions.LoadTodos),
            switchMap(() =>
                this.todoService.getToDos().pipe(
                    map((data: ToDo[]) => {
                        return ToDoActions.LoadTodosSuccess({ todos: data });
                    }),
                    catchError((error: Error) => of(ToDoActions.HttpErrorResponse(error)))
                )
            )
        )
    );
}