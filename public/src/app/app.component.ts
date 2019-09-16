import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  tasks: any = [];
  id: string = '5d8009d658724b74cf47f1ad';
  task: any = {};

  constructor(private _httpService: HttpService) {
  }
  ngOnInit() {
    this.getTasksFromService();
    this.getTaskFromService(this.id);
  }
  getTasksFromService() {
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("we have the tasks!", data);
      this.tasks = data;
    })

  }
  getTaskFromService(id) {
    let tempObservable = this._httpService.getTask(id)
    tempObservable.subscribe(data => {
      console.log("here is the id deets:", data)
      this.task = data;
    });
  }
}
