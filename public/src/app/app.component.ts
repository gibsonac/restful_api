import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any = [];
  id: string = '';
  task: any = {};
  dontShow: boolean = false;
  // typedMessage: string = "";
  typedTask: any = {};
  newTask: any;
  editTask: any;
  haveErrors: boolean = false;
  // errors: String[] = [];
  errors: String = '';
  selectedTask: any;

  constructor(private _httpService: HttpService) {
  }
  ngOnInit() {
    this.getTasksFromService();
    this.getTaskFromService(this.id);
    this.newTask = { title: "", desc: "" }
    this.editTask = { title: "", desc: "" }
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
  OnSubmit() {
    let tempObservable = this._httpService.postTask(this.newTask)
    tempObservable.subscribe(data => {
      console.log(data)
      if (data.length > 0) {
        this.errors = data;
        // this.errors = data[0];
        console.log("my errors:", this.errors);
        //   this.errors.push(data[0]);
        this.haveErrors = true;
        //   console.log(this.errors);
      }
      else {
        this.errors = "";
        console.log("here is the new addition:", data)
        this.newTask = { title: "", desc: "" }
        this.getTasksFromService();
      }

    })
  }
  ButtonDelete(id) {
    let tempObservable = this._httpService.deleteTask(id)
    tempObservable.subscribe(data => {
      console.log("deleted it!", data)
      this.getTasksFromService();
    })
  }
  ButtonEdit(id) {
    console.log(id);
    let tempObservable = this._httpService.getTask(id)
    tempObservable.subscribe(data => {
      this.editTask = data;
    });
    this.dontShow = true;
  }
  EditSubmit(id) {
    let tempObservable = this._httpService.updateTask(id, this.editTask)
    tempObservable.subscribe(data => {
      console.log("update complete:", data)
      this.getTasksFromService();
    });
  }
  taskToShow(task){
    this.selectedTask = task;
  }
}








// ButtonShowAll(){
//   this.dontShow = false;
// }
// onKey(event){
//   console.log(event);
//   // this.typedMessage += event.target.value;
//   let tempObservable = this._httpService.getTask(event.target.value)
//   tempObservable.subscribe(data => {
//     if(data){
//       this.typedTask = data;
//     }
//   })
// }