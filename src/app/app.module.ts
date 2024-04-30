import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_CONFIG } from '../constants';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SeekerRegistrationComponent } from './components/seeker-registration/seeker-registration.component';
import { RecruiterRegistrationComponent } from './components/recruiter-registration/recruiter-registration.component';
import { FormsModule, NgModel } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SeekerPageComponent } from './components/seeker-page/seeker-page.component';
import { RecruiterPageComponent } from './components/recruiter-page/recruiter-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SeekerRegistrationComponent,
    RecruiterRegistrationComponent,
    NavbarComponent,
    SeekerPageComponent,
    RecruiterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    AngularFirestore,
    AngularFirestoreModule,
    AngularFireAuth,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
