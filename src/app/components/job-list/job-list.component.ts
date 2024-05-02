import { UserService } from './../../services/UserService/user.service';
import { Component } from '@angular/core';
// import { FirebaseService } from '../../services/firebaseService/firebase.service';
import { Observable, firstValueFrom, map } from 'rxjs';
import { User } from '../../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {

  constructor(private db: AngularFirestore, private userService: UserService, private auth: AngularFireAuth) { }

  async test() {
    const { uid } = (await firstValueFrom(this.auth.user))!;
    const { appliedJobsIds } = (await this.userService.getUser(uid))!;
    const arr = (appliedJobsIds ?? []).map(async (job) => {
      const jobs$ = this.db.collection("jobs").doc(job).valueChanges();
      return await firstValueFrom(jobs$);
    })
    console.log(arr)
  }
}
