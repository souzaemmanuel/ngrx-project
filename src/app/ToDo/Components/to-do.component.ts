import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import ToDo from '../state/todo.model';
import ToDoState from '../state/todo.state';
import { ToDoFacade } from './../state/todo.facade';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todo$: Observable<ToDoState>;
  ToDoSubscription: Subscription;
  ToDoList: ToDo[] = [];

  Title: string = '';
  IsCompleted: boolean = false;
  todoError: Error = null;

  constructor(private _todoFacade: ToDoFacade) {
    this.todo$ = _todoFacade.todo$;
  }

  ngOnInit() {
    
    //Calling the facade method, to give all tasks
    this._todoFacade.getAllTasks();

    //Listening this observable, so that brings  error or tasks available
    this.ToDoSubscription = this.todo$
      .pipe(
        map(x => {
          this.ToDoList = x.ToDos;
          this.todoError = x.ToDoError;
        })
      )
      .subscribe();
  }

  /**
   * Call facade method responsible to create task
   */
  createToDo() {
    const todo: ToDo = { Title: this.Title, IsCompleted: this.IsCompleted };
    this._todoFacade.createToDo(todo);
  }

  /**
   * Resets all fields in form
   */
  resetFields() {
    this.Title = '';
    this.IsCompleted = false;
  }

  /**
   * When component is destroyed, unsubscribe all observables
   */
  ngOnDestroy() {
    if (this.ToDoSubscription) {
      this.ToDoSubscription.unsubscribe();
    }
  }
}
