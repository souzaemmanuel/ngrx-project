import { Component, OnInit } from '@angular/core';
import {
  TodosState} from '../state'
import * as TodoActions from '../state/todo.action'
import { ToDo } from '../state/todo.model';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoFacade } from '../state/todo.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html'
})
export class ToDoComponent implements OnInit {

  public todo$: Observable<any>;
  public todoForm: FormGroup;
  public toDoSubscription: Subscription;

  public loadTask(task: ToDo) {
    this.todoForm.patchValue(task);
  }

  constructor(
    private _todoFacade: ToDoFacade,
    private _store: Store<TodosState>,
    private _formBuilder: FormBuilder) {
    this.todo$ = _todoFacade.todo$;
  }

  public ngOnInit() {
    this.todoForm = this._formBuilder.group({
      id: [null],
      text: [, Validators.compose([Validators.required])],
      completed: [false],
    });
  }

  /**
   * Adding or editing a task
   */
  public async saveTodo() {

    //check if form is valid
    if (!this.todoForm.valid) return;

    const todo: ToDo = this.todoForm.value;

    if (todo.id)
      await this._todoFacade.editTask(todo);
    else
      await this._todoFacade.newTask(todo);

    //reseting fields
    this.todoForm.reset();
  }

  /**
   * Marking task with check or un-check
   * @param id 
   * @param completed 
   */
  public checkTask(id, completed) {
    this._todoFacade.checkTask(id, completed);
  }

  /**
   * Editing some task
   * @param task - task data
   */
  public editTask(task: ToDo) {
    this._todoFacade.editTask(task);
  }

  /**
   * Removing task, by id
   * @param id - task id
   */
  public removeTodo(id) {
    this._store.dispatch(new TodoActions.DeleteTodo({ id }))
  }
}
