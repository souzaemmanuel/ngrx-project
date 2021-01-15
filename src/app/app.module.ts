import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoComponent } from './ToDo/components/to-do.component';
import { ToDoFacade } from './ToDo/state/todo.facade';
import { reducers } from './ToDo/state';

@NgModule({
  declarations: [AppComponent, ToDoComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [ToDoFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
