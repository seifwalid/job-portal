import { Job } from './../../models/Job';
import { CompanyService } from './../../services/companyService/company.service';
import { Component, Input } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../../models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './app-job-details.component.html',
  styleUrl: './app-job-details.component.css'
})
export class AppJobDetailsComponent {
  @Input() jobId!: string;

  @Input() user!: any;

  edit = false;
  status :string = "active";
  job!: Observable<any>;
  jobForm!: FormGroup;

  constructor(private fire :Firestore, private fb:FormBuilder , private CompanyService: CompanyService) { } 
  
  async ngOnInit() {
    this.jobForm = this.fb.group({
      title: [''],
      description: [''],
      location: [''],
      salary: [''],
      qualifications: ['']
    });

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
  


  toggleEdit(){
    this.edit = !this.edit;
  }
  deleteJob(){}

  pauseJob(job:any){
    job.status = "closed"; 
    console.log(job);
  
   this.CompanyService.updateCompanyJob(job);
   
  }

  resumeJob(job:any){
    job.status = "open";
    console.log(job);
    this.CompanyService.updateCompanyJob(job);
    // job.status = "active"; 
    // this.CompanyService.updateCompanyJob(job);  
  } 


  test(user :any ){
    console.log (user);
  }

  editJob(job:any){
    job.title = this.jobForm.value.title; 
    job.description = this.jobForm.value.description;
    job.location = this.jobForm.value.location;
    job.salary = this.jobForm.value.salary;
    job.qualifications = this.jobForm.value.qualifications;
    this.CompanyService.editJob(job);
    this.toggleEdit();
  }
}
