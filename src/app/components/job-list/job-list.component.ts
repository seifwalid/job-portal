import { CompanyService } from './../../services/companyService/company.service';
import { UserService } from './../../services/UserService/user.service';
import { Component } from '@angular/core';
// import { FirebaseService } from '../../services/firebaseService/firebase.service';
import { Observable, firstValueFrom, map } from 'rxjs';
import { User } from '../../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { Job } from '../../models/Job';
import { v4 as uuid } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
})
export class JobListComponent {
  jobForm!: FormGroup;
  add = false;
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';
  user: any | null = null;
  uid: string = '';
  jobs?: any[] = [];
  users!: Observable<User>;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private userService: UserService,
    private auth: AngularFireAuth,
    private fire: Firestore,
    private CompanyService: CompanyService
  ) {}

  
  async ngOnInit() {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      qualifications: ['', Validators.required],
      benefits: ['', Validators.required],
      responsibilities: ['', Validators.required]
    });
  
    this.users = this.CompanyService.getCurrentUserData();
  }
    createjob(user:any){

      const newjob = {
        id:uuid(),
        title: this.jobForm.value.title,
        status: "open",
        description: this.jobForm.value.description,
        location: this.jobForm.value.location,
        salary: parseInt(this.jobForm.value.salary),
        qualifications: this.jobForm.value.qualifications,
        responsibilities: this.jobForm.value.responsibilities,
        benefits: this.jobForm.value.benefits,
        applicants:[],
        postedby:this.CompanyService.getCurrentUserID(),
        
      };
      
      this.CompanyService.createJob(user, newjob);
       this.add = false;
      console.log(newjob);
    }
 

  toggleAdd() {
    this.add = !this.add;
    console.log(this.add);
  }

  signOut() {
    this.auth.signOut();
  }

 

  editJob(job: any) {
    console.log(job);
  }
  deleteJob(job: any) {}

  signIn() {
    this.auth.signInWithEmailAndPassword('admin@gmail.com', 'Admin123');
  }
}
