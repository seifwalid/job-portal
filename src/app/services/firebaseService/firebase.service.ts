import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from './../../models/User';
import { Firestore, collection, collectionData, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';

import { Observable, first, map, observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import{getAuth} from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {




  constructor(private firestore:Firestore, private datab:AngularFireDatabase, private auth:AngularFireAuth, private db:AngularFirestore ) {

   }

   getUser():Observable<User>  {

    const usersCOllection =collection(this.firestore, "users"); 
     const UserDoc = doc(usersCOllection,"4ym3fVkelSaBuizj4E8uUUITFmu1");
    const users = docData(UserDoc)
    console.log(users);
    return users as  Observable<User>; 
    
  }
  getCurrentUserData():Observable<User>{
    const uid = this.getCurrentUserID();
    const usersCOllection =collection(this.firestore, "users"); 
    const UserDoc = doc(usersCOllection,uid);
   const users = docData(UserDoc)
 
   return users as  Observable<User>; 
   
  }

  getCurrentUserID(){
    const auth= getAuth(); 
    const user = auth.currentUser;
    return user?.uid; 
  }

  
    updateUser (user:User) { 
      const uid = this.getCurrentUserID(); 
    
      this.db.collection("users").doc(uid).update(user);

    }
 
// getUser(): Observable<User> {
//   const userDoc = doc(this.usersCOllection, "4ym3fVkelSaBuizj4E8uUUITFmu1"); // Reference the document for the user
//   return docData(userDoc).pipe(
//     map(userData => userData as User) // Assuming userData has the same structure as User
//   );
// }
  
}
