import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ToDo } from '.';

@Injectable({
    providedIn: 'root'
})
export class ToDoHttpService {
    constructor(private httpclient: HttpClient) { }

    getToDos(): Observable<ToDo[]> {
        //Adpated this one, for request the json, and not a server
        return this.httpclient.get<ToDo[]>('assets/db.json');
    }
}