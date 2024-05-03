import { Job } from './../../models/Job';
import { defaultIfEmpty, firstValueFrom, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService/user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { v4 as uuid } from 'uuid';
import { collection, doc, docData, Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';
  user: any | null = null;
  uid: string = "";
  jobs?: any[] = [];


    users!: Observable<User>;

  constructor(
    public readonly auth: AngularFireAuth,
    private userService: UserService,
    private db: AngularFirestore,
    private firestore: Firestore
  ) { 
   
  }
  
  

  // this.auth.user.subscribe(async (user: any) => {
  //   this.isAuthenticated = !!user;
  //   this.user = user;
  //   this.uid = user.uid;
  //   console.log('user', user?.uid ?? null);
  //   const u = await this.userService.getUser(this.uid);
  //   let jobs = (u?.postedJobsIds ?? []).map(async (jobRef) => {
  //     const t = this.db.doc(jobRef).valueChanges();
  //     return await firstValueFrom(t);
  //   })
  //   this.jobs = await Promise.all(jobs);
  //   console.log(u)
  //   console.log(this.jobs)
  // });
  

  async ngOnInit() {
  this.users= this.getUser();
  }

  getUser():Observable<User>  {

    const usersCOllection =collection(this.firestore, "users"); 
     const UserDoc = doc(usersCOllection,"4ym3fVkelSaBuizj4E8uUUITFmu1");
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<User>; 
    
  }

  signOut() {
    this.auth.signOut();
  }

  // async test() {
  //   this.user = await this.userService.getUser(this.user?.uid);
  //   console.log("user", this.user);
  //   const jobs = await this.userService.getUserJobs(this.uid);
  //   console.log("jobs", jobs);
  // }


  test(id: string) {
  
    const usersCOllection =collection(this.firestore, "jobs"); 
     const UserDoc = doc(usersCOllection,id);
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<Job>;

  }

  fetchJobsDetails(id: any) {
    const usersCOllection =collection(this.firestore, "jobs"); 
     const UserDoc = doc(usersCOllection,id);
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<Job>; 

  }
  async createJob() {
    this.user = await this.userService.getUser(this.uid);
    const newJob = {
      id: uuid(),
      title: "test",
      description: "test",
      companyName: "test",
      companyDescription: "test",
      companyContactInfo: "test",
      location: "test",
      salary: 1000,
      postedBy: this.db.doc(`users/${this.uid}`).ref,
    }
    await this.db.collection("jobs").doc(newJob.id).set(newJob);
    const jobRef = this.db.collection("jobs").doc(newJob.id).ref;
    await this.db.doc(`users/${this.uid}`).update({
      ...this.user,
      postedJobsIds: [...(this.user?.postedJobsIds ?? []), jobRef],
    });
  }

  editJob(job: any) {
    console.log(job); 
  }
  deleteJob(job: any) { }

  signIn() {
    this.auth.signInWithEmailAndPassword('admin@gmail.com', 'Admin123');
  }
}
