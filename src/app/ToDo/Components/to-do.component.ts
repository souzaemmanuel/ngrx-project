import { Component, OnInit } from '@angular/core';
import { ToDo } from '../state/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoFacade } from '../state/todo.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html'
})
export class ToDoComponent implements OnInit {

  public todo$: Observable<ToDo[]> = this.todoFacade.todo$;
  public todoForm: FormGroup;
  public toDoSubscription: Subscription;

  constructor(
    private readonly todoFacade: ToDoFacade,
    private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.todoFacade.getTasks();
    this.buildForm();
  }

  public loadTask(task: ToDo): void {
    this.todoForm.patchValue(task);
  }

  private buildForm() {
    this.todoForm = this.formBuilder.group({
      id: [null],
      text: [, Validators.compose([Validators.required])],
      completed: [false],
    });
  }

  public saveTask() : void {
    
    //check if form is valid
    if (!this.todoForm.valid) return;

    if (this.todoForm.value.id)
      this.todoFacade.editTask(this.todoForm.value);
    else {
      this.todoFacade.newTask(new ToDo(this.todoForm.value.text, this.todoForm.value.completed));
    }

    //reseting fields
    this.todoForm.reset();
  }

  public checkOrUnCheckTask(id, completed) : void{
    this.todoFacade.checkTask(id, completed);
  }

  public editTask(task: ToDo): void {
    this.todoFacade.editTask(task);
  }

  public removeTodo(taskId): void {
    this.todoFacade.removeTodo(taskId);
  }
}
