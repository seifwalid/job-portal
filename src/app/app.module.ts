import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{InputTextModule} from 'primeng/inputtext'; 
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { FIREBASE_CONFIG } from '../constants';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SeekerRegistrationComponent } from './components/seeker-registration/seeker-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SeekerPageComponent } from './components/seeker-page/seeker-page.component';
import { RecruiterPageComponent } from './components/recruiter-page/recruiter-page.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';
import { provideFirebaseApp, getApp } from '@angular/fire/app';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask'; 
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { ButtonModule } from 'primeng/button'; 
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar'; // Import ProgressBarModule
import { MessagesModule } from 'primeng/messages'; //
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeIcons } from 'primeng/api';
import { JobListComponent } from './components/job-list/job-list.component';
import { AppJobDetailsComponent } from './components/app-job-details/app-job-details.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { SeekerJobListingComponent } from './components/seeker-job-listing/seeker-job-listing.component';
import { SeekerJobCardComponent } from './components/seeker-job-card/seeker-job-card.component';
import { PostedbyComponent } from './components/postedby/postedby.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SeekerRegistrationComponent,
    RecruiterRegistrationComponent,
    NavbarComponent,
    SeekerPageComponent,
    RecruiterPageComponent,
    CompanyProfileComponent,
    JobListComponent,
    AppJobDetailsComponent,
    CreateJobComponent,
    SeekerJobListingComponent,
    SeekerJobCardComponent,
    PostedbyComponent,
  ],
  imports: [
    CardModule, 
    InputMaskModule,
    InputTextModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FormsModule,
    ButtonModule,
    ProgressBarModule,
    MessagesModule
  ],
  providers: [
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(FIREBASE_CONFIG)),
      provideFirestore(() => getFirestore()),
    ]),
    AngularFirestore,
    AngularFirestoreModule,
    AngularFireAuth,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
