import { firstValueFrom, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuid } from 'uuid';

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

  constructor(
    public readonly auth: AngularFireAuth,
    private userService: UserService,
    private db: AngularFirestore,
  ) { }

  async ngOnInit(): Promise<void> {
    this.auth.user.subscribe(async (user: any) => {
      this.isAuthenticated = !!user;
      this.user = user;
      this.uid = user.uid;
      console.log('user', user?.uid ?? null);
      const u = await this.userService.getUser(this.uid);
      let jobs = (u?.postedJobsIds ?? []).map(async (jobRef) => {
        const t = this.db.doc(jobRef).valueChanges();
        return await firstValueFrom(t);
      })
      this.jobs = await Promise.all(jobs);
      console.log(u)
      console.log(this.jobs)
    });
  }

  signOut() {
    this.auth.signOut();
  }

  async test() {
    this.user = await this.userService.getUser(this.user?.uid);
    console.log("user", this.user);
    const jobs = await this.userService.getUserJobs(this.uid);
    console.log("jobs", jobs);
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

  editJob(job: any) { }
  deleteJob(job: any) { }

  signIn() {
    this.auth.signInWithEmailAndPassword('admin@gmail.com', 'Admin123');
  }
}
