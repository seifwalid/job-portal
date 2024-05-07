import { Observable } from 'rxjs';
import { CompanyService } from './../../services/companyService/company.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css'
})
export class SavedJobsComponent {
  User!: Observable<any>;
  constructor(private companyService:CompanyService) { }
  ngOnInit(){
    this.User = this.companyService.getCurrentUserData();
  }
}
