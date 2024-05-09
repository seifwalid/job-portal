import { CompanyService } from './../companyService/company.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class SeekerService {
  constructor(private db: AngularFirestore, private firestore: Firestore, private companyService:CompanyService) {}

  getFilteredJobs(salary: any, location: any, title: any) {
    if (!salary && !location && title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection, where('title', '==', title));
      const result = collectionData(q);
      return result as Observable<any[]>;
    } else if (!salary && location && !title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection, where('location', '==', location));
      const result = collectionData(q);
      return result as Observable<any[]>;
    } else if (salary && !location && !title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection,where("salary","==",salary));
      const result = collectionData(q);  
      return result as Observable<any[]>;
    } else if (salary && location && !title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection,where("salary","==",salary), where('location', '==', location));
      const result = collectionData(q);  
      return result as Observable<any[]>;
     
    } else if (!salary && location && title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection,where("title","==",title), where('location', '==', location));
      const result = collectionData(q);  
      return result as Observable<any[]>;
    } else if (salary && !location && title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection,where("salary","==",salary), where("title", "==", title));
      const result = collectionData(q);  
      return result as Observable<any[]>;
      
    } else if (salary && location && title) {
      const productsCoolection = collection(this.firestore, 'jobs');
      // const document = doc(productsCoolection,productId);
      const q = query(productsCoolection,where("salary","==",salary),where("title","==",title), where('location', '==', location));
      const result = collectionData(q);  
      return result as Observable<any[]>;
    } else {
      const productsCoolection = collection(this.firestore, 'jobs');
      const result = collectionData(productsCoolection);
      return result as Observable<any>;
    }

    

  }

  saveJob(id:any , user:any, jobId :string) {

   
    user.savedJobsIds.push(jobId);
    console.log(user);
    this.db.collection('users').doc(id).update(
     user
    );

  }

  unsaveJob(id:any , user: any, jobId: string) {
    const index = user.savedJobsIds.indexOf(jobId);
    if (index > -1) {
      user.savedJobsIds.splice(index, 1);
    }
    console.log(user);
    this.db.collection('users').doc(id).update(user);
  }

  getJobs() {
    const productsCoolection = collection(this.firestore, 'jobs');
    const result = collectionData(productsCoolection);
    return result as Observable<any>;
  }

  applyForJob(job: any, user: any) {
    const id =this.companyService.getCurrentUserID();
    job.applicants.push(id);
    this.db.collection('jobs').doc(job.id).update(job);

    user.appliedJobsIds.push(job.id);
    this.db.collection('users').doc(id).update(user);
  } 
}
