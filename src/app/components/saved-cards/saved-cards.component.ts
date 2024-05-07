import { SeekerService } from './../../services/seekerService/seeker.service';
import { Firestore } from '@angular/fire/firestore';
import { CompanyService } from './../../services/companyService/company.service';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import{User} from '../../models/User';
@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrl: './saved-cards.component.css'
})
export class SavedCardsComponent {
@Input() id!: any;
expanded: boolean = false;
jobs!:Observable<any>;
company!:Observable<User>;
User: any;
  constructor(private CompanyService:CompanyService, private firestore:AngularFirestore, private SeekerService:SeekerService) { }
  ngOnInit(){
  this.User = this.CompanyService.getCurrentUserData();
  this.jobs= this.firestore.collection('jobs').doc(this.id).valueChanges();
 
}
toggleExpand(Job: any) {
  this.expanded = !this.expanded;
  console.log(Job);
}
showCompany(company: any) {
  console.log(company);
}

saveJob(job: any, user: any) {
  console.log(job.id);
  console.log(user);
  const id = this.CompanyService.getCurrentUserID();
  console.log(id);
  this.SeekerService.saveJob(id, user, job.id);
}
UnsaveJob(job: any, user: any) {
  const id = this.CompanyService.getCurrentUserID(); 
  this.SeekerService.unsaveJob(id, user, job.id);
}
checkSaved(job: any, user: any) {
  return user.savedJobsIds.includes(job.id);
}
}
