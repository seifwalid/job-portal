import { SeekerService } from './../../services/seekerService/seeker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seeker-job-listing',
  templateUrl: './seeker-job-listing.component.html',
  styleUrl: './seeker-job-listing.component.css',
})
export class SeekerJobListingComponent {
  jobs!: any[];
  filteredJobs!: any[];
  jobType: string = '';
  searchKeyword: string = '';
  
  
  constructor(private SeekerService:SeekerService) {}

  ngOnInit(): void {
    this.SeekerService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      this.filteredJobs = [...jobs];
    });
  }
}
