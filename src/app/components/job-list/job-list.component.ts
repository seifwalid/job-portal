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

  // async test() {
  //   const { uid } = (await firstValueFrom(this.auth.user))!;
  //   const { appliedJobsIds } = (await this.userService.getUser(uid))!;
  //   const arr = (appliedJobsIds ?? []).map(async (job) => {
  //     const jobs$ = this.db.collection("jobs").doc(job).valueChanges();
  //     return await firstValueFrom(jobs$);
  //   })
  //   console.log(arr)
  // }
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

  // test(id: string) {
  //   const usersCOllection = collection(this.fire, 'jobs');
  //   const UserDoc = doc(usersCOllection, id);
  //   const users = docData(UserDoc);
  //   console.log(users);
  //   return users as Observable<Job>;
  // }

  // fetchJobsDetails(id: any) {
  //   const usersCOllection = collection(this.fire, 'jobs');
  //   const UserDoc = doc(usersCOllection, id);
  //   const users = docData(UserDoc);
  //   console.log(users);
  //   return users as Observable<Job>;
  // }

  // async createJob() {
  //   this.user = await this.userService.getUser(this.uid);
  //   const newJob = {
  //     id: uuid(),
  //     title: 'test',
  //     description: 'test',
  //     companyName: 'test',
  //     companyDescription: 'test',
  //     companyContactInfo: 'test',
  //     location: 'test',
  //     salary: 1000,
  //     postedBy: this.db.doc(`users/${this.uid}`).ref,
  //   };
  //   await this.db.collection('jobs').doc(newJob.id).set(newJob);
  //   const jobRef = this.db.collection('jobs').doc(newJob.id).ref;
  //   await this.db.doc(`users/${this.uid}`).update({
  //     ...this.user,
  //     postedJobsIds: [...(this.user?.postedJobsIds ?? []), jobRef],
  //   });
  // }

  editJob(job: any) {
    console.log(job);
  }
  deleteJob(job: any) {}

  signIn() {
    this.auth.signInWithEmailAndPassword('admin@gmail.com', 'Admin123');
  }
}
