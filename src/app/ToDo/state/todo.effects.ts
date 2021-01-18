import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToDo } from '.';
import * as ToDoActions from './todo.action';
import { ToDoHttpService } from './todo.httpservice';

@Injectable()
export class ToDoEffects {
    constructor(private todoService: ToDoHttpService, private action$: Actions) { }

    GetToDos$: Observable<Action> = createEffect(() =>
        this.action$.pipe(
            ofType(ToDoActions.LoadTodos),
            mergeMap(() =>
                this.todoService.getToDos().pipe(
                    map((data: ToDo[]) => {
                        return ToDoActions.LoadTodosSuccess({ todos: data });
                    }),
                    catchError((error: Error) => {
                        return of(ToDoActions.ErrorToDoAction(error));
                    })
                )
            )
        )
    );
}