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

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
})
export class JobListComponent {
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';
  user: any | null = null;
  uid: string = '';
  jobs?: any[] = [];
  users!: Observable<User>;

  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private auth: AngularFireAuth,
    private fire: Firestore
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
    this.users = this.getUser();
  }

  getUser():Observable<User>  {

    const usersCOllection =collection(this.fire, "users"); 
     const UserDoc = doc(usersCOllection,"4ym3fVkelSaBuizj4E8uUUITFmu1");
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<User>; 
    
  }

  signOut() {
    this.auth.signOut();
  }

  test(id: string) {
  
    const usersCOllection =collection(this.fire, "jobs"); 
     const UserDoc = doc(usersCOllection,id);
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<Job>;

  }

  
  fetchJobsDetails(id: any) {
    const usersCOllection =collection(this.fire, "jobs"); 
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
