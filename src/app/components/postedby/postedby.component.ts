import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-postedby',
  templateUrl: './postedby.component.html',
  styleUrl: './postedby.component.css'
})
export class PostedbyComponent {
@Input() user!: any;
company!:Observable<any> ;
constructor(private firestore:AngularFirestore) { 
  console.log("i constructed company");
  console.log(this.user);
}

OnInit(): void {
  this.company= this.firestore.collection('users').doc(this.user).valueChanges(); 

  console.log("i fetched company");
  }
}
