import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-applicant-card',
  templateUrl: './applicant-card.component.html',
  styleUrl: './applicant-card.component.css',
})
export class ApplicantCardComponent {
  @Input() id!: any;
  @Input() name: any=null;

  User!:Observable<any>;
  constructor(private fire: AngularFirestore) {}
  async ngOnInit() {
    
    
    this.User = await this.fire.collection('users').doc(this.id).valueChanges();
  }

  showResume(user: any) {
    console.log(user);
    window.open(user.resume, '_blank');
  }

  checkFilter(user:any){
    if(this.name == null){
      return true;
    }
    else if( this.name === user.name){
      return true;

    }
    else{
      return false;
    }
  }
}
