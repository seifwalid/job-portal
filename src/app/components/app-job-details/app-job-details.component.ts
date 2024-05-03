import { Component, Input } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Job } from '../../models/Job';
import { User } from '../../models/User';

@Component({
  selector: 'app-job-details',
  templateUrl: './app-job-details.component.html',
  styleUrl: './app-job-details.component.css'
})
export class AppJobDetailsComponent {
  @Input() jobId!: string;

  @Input() user!: any;
  status :string = "active";
  job!: Observable<any>;

  constructor(private fire :Firestore) { } 
  
  async ngOnInit() {
    console.log(this.jobId);
    this.job = this.getJob(this.jobId);
  } 

  getJob(id :string): Observable<any> {
    const usersCOllection =collection(this.fire, "jobs"); 
    const UserDoc = doc(usersCOllection,id);
   const users = docData(UserDoc)

   console.log("i fetched jobs ");
   console.log(users);
   return users as  Observable<Job>; 
  } 
  
  editJob(){}

  deleteJob(){}

  pauseJob(){
    this.status = "paused";
    console.log(this.user);
  }

  resumeJob(){
    this.status = "active";   
  } 


  test(user :any ){
    console.log (user);
  }
}
