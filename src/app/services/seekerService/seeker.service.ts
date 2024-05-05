import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  constructor(private db: AngularFirestore) { 


  }



  getJobs (){
  return this.db.collection('jobs').valueChanges();    
  }
}
