import { SeekerJobListingComponent } from './components/seeker-job-listing/seeker-job-listing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SeekerRegistrationComponent } from './components/seeker-registration/seeker-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { SeekerPageComponent } from './components/seeker-page/seeker-page.component';
import { RecruiterPageComponent } from './components/recruiter-page/recruiter-page.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { ImageTestComponent } from './components/image-test/image-test.component';
import { SeekerProfileComponent } from './components/seeker-profile/seeker-profile.component';
import { AllApplicantsComponent } from './components/all-applicants/all-applicants.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "seeker", component: SeekerJobListingComponent },
  {path:"seeker",component:SeekerPageComponent},
  {path:"test", component:ImageTestComponent}, 
  {path:"savedJobs",component:SavedJobsComponent},
  { path:"profile",component:CompanyProfileComponent},
  { path: "recruiter", component: RecruiterPageComponent },
  { path: "login", component: LoginComponent },
  {path:"jobs",component:JobListComponent},
  { path: "register/seeker", component: SeekerRegistrationComponent },
  { path: "register/recruiter", component: RecruiterRegistrationComponent },
  {path:"seekerProfile", component:SeekerProfileComponent},
  { path:"allApps",component:AllApplicantsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
