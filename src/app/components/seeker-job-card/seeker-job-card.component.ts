import { SeekerService } from './../../services/seekerService/seeker.service';
import { CompanyService } from './../../services/companyService/company.service';
import { User } from './../../models/User';
import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seeker-job-card',
  templateUrl: './seeker-job-card.component.html',
  styleUrl: './seeker-job-card.component.css',
})
export class SeekerJobCardComponent {
  @Input() job!: any;

  @Input() user!: any;

  User!: Observable<User>;
  company!: Observable<any>;

  expanded: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private CompanyService: CompanyService,
    private SeekerService: SeekerService
  ) {}

  ngOnInit(): void {
    this.company = this.firestore
      .collection('users')
      .doc(this.job.postedby)
      .valueChanges();
      console.log("initialized");
      console.log(this.job);
    this.User = this.CompanyService.getCurrentUserData();
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
    this.SeekerService.unsaveJob(id , user, job.id);
  }
  checkSaved(job: any, user: any) {
    return user.savedJobsIds.includes(job.id);
  }

  applyJob(job: any, company: any, user : any) {

    
    user.appliedJobsIds.push(job.id);
    this.firestore.collection('users').doc(this.CompanyService.getCurrentUserID()).update(user);

    job.applicants.push(this.CompanyService.getCurrentUserID());
    this.firestore.collection('jobs').doc(job.id).update(job);

    company.applicants.push(this.CompanyService.getCurrentUserID());
    this.firestore.collection('users').doc(job.postedby).update(company);
    
    console.log(job);
    console.log(company);
    console.log(user);

  
  }

  checkApplied(job: any, user: any) {
    if(user.appliedJobsIds.includes(job.id)){
      return true;
    }else {
      return false;
    }
}
}
