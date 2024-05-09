import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { User } from './../../models/User';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';

import { Observable, first, map, observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Job } from '../../models/Job';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  // user: any | null = null;
  companyData: any | null = null;
  constructor(
    private firestore: Firestore,
    private datab: AngularFireDatabase,
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  getCurrentUserData(): Observable<User> {
    const uid = this.getCurrentUserID();
    console.log(uid);
    const usersCOllection = collection(this.firestore, 'users');
    const UserDoc = doc(usersCOllection, uid);
    const users = docData(UserDoc);

    return users as Observable<User>;
  }

  getCurrentUserID() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user?.uid;
  }

  async updateCompanyJob(job:any) {
   
    const Uid = this.getCurrentUserID();
    this.companyData = this.getCurrentUserData();
    this.db.collection('jobs').doc(job.id).update(job);
    console.log('updated');
  }

  async editJob(job: any) {

    this.db.collection('jobs').doc(job.id).update(job);
    console.log('updated job');
  }

  
  async deleteCompanyJob(job: any) {
    this.db.collection('jobs').doc(job.id).delete();
    console.log('deleted job');
  }
  async createJob(user:any, job: any) {
    this.companyData = this.getCurrentUserData();
    
    const userId = this.getCurrentUserID();
    this.createjob(job, job.id);
    // Update the document with the user ID
    await this.db.doc(`users/${userId}`).update({
      // Spread the existing properties of the user
      ...user,
      // Add the new jobRef string to the postedJobsIds array
      postedJobsIds: [...(user?.postedJobsIds ?? []), job.id],
    });
     console.log('updated user with new job ');
  }

  createjob(job: any, id: string) {
    this.db.collection('jobs').doc(id).set(job);
  }
  updateUser(user: User) {
    const uid = this.getCurrentUserID();

    this.db.collection('users').doc(uid).update(user);
  }
}
