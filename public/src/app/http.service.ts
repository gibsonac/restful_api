import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getTask('5d7d6196fef9cf5e47e4f3e0');
    // this.deleteTask('5d7d6196fef9cf5e47e4f3e0');
    // this.getTasks();
  }
  getTasks() {
    // our http response is an Observable, store it in a variable
    return this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log("Got our tasks!", data));
  }
  getTask(id) {
    return this._http.get(`/tasks/${id}`)
    // tempObservable.subscribe(data => console.log("here is the id deets:", data));
  }
  deleteTask(id) {
    return this._http.delete(`/tasks/${id}`)
    // let tempObservable = this._http.delete(`/tasks/${id}`)
    // tempObservable.subscribe(data => console.log("here is the id we'll delete:", data));
  }
  postTask(newTask) {
    return this._http.post('/tasks/', newTask)
    // let tempObservable = this._http.post('/tasks/', newTask)
    // tempObservable.subscribe(data => console.log("we have a new task!", data));
  }
  updateTask(id, editTask) {
    console.log(editTask);
    return this._http.put(`/tasks/${id}`, editTask)
  }

}

