import { User } from './../../models/User';
import { Job } from './../../models/Job';
import { Observable } from 'rxjs';
import { SeekerService } from './../../services/seekerService/seeker.service';
import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/companyService/company.service';

@Component({
  selector: 'app-seeker-job-listing',
  templateUrl: './seeker-job-listing.component.html',
  styleUrl: './seeker-job-listing.component.css',
})
export class SeekerJobListingComponent {
  jobs!: any;
  User!:any;
  filteredJobs!: any[];
  filter: boolean = false;
  jobForm!: FormGroup;
  jobType: string = '';
  searchKeyword: string = '';

  expanded: boolean = false;

  constructor(
    private seekerService: SeekerService,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      qualifications: ['', Validators.required],
      benefits: ['', Validators.required],
      responsibilities: ['', Validators.required],
    });
    this.jobs = this.firestore.collection('jobs').valueChanges();
    const id  = this.companyService.getCurrentUserID();
    setTimeout(() => {
      
    }, 2000);
    console.log(id);
    this.User = this.companyService.getCurrentUserData();
    console.log(this.jobs);
  }

  toggleExpand(Job: any) {
    this.expanded = !this.expanded;
    console.log(Job);
  }

  onSearch(value: any, filterType: string): void {
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
  }

  logFilter(filterType: string, value: string | number) {
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
  }

  filterSearch() {}

  showfilter() {
    const salary = parseInt(this.jobForm.value.salary);
    const location = this.jobForm.value.location;
    const title = this.jobForm.value.title;
    this.jobs = this.seekerService.getFilteredJobs(salary, location, title);
    // this.jobs= this.seekerService.getFilteredJobs(salary)
  }
  toggleFilter() {
    this.filter = !this.filter;
  }
}
