import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-postedby',
  templateUrl: './postedby.component.html',
  styleUrl: './postedby.component.css'
})
export class PostedbyComponent {
@Input() id!: any;
company!:Observable<any> ;
constructor(private firestore:AngularFirestore) { 

}

ngOnInit(): void {
  this.company= this.firestore.collection('users').doc(this.id).valueChanges(); 

console.log (this.id);
  }
}
