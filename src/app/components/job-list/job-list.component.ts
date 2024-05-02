import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebaseService/firebase.service';
import { Observable, map } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {


  UserData!:Observable<User>;

  constructor(private db :FirebaseService){}

  test(){
const user =this.mapObservable();

console.log(user); 
  }


  mapObservable(){
    this.UserData=this.db.getCurrentUserData();
    return this.UserData.pipe( map(value => ({
    
      name: value.name,
      contactInfo: value.companyContactInfo,

    }))
  );
  }

}
