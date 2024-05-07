
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from '../../services/companyService/company.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-all-applicants',
  templateUrl: './all-applicants.component.html',
  styleUrl: './all-applicants.component.css'
})
export class AllApplicantsComponent {
User!:Observable<User>;
searchValue: any= null;


constructor (private companyService:CompanyService){}
ngOnInit(){
  this.User =  this.companyService.getCurrentUserData();
}


}
