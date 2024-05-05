import { CompanyService } from './../../services/companyService/company.service';
import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from '../../services/firebaseService/firebase.service';
import { Observable, map, tap, toArray } from 'rxjs';
import { User } from '../../models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css',
})
export class CompanyProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
     private CompanyService: CompanyService
  ) {}

    usedUser:any; 
  
  contactForm!: FormGroup;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      contactInfo: ['', Validators.required],
      
    });

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.companyData=this.CompanyService.getCurrentUserData()
    }, 2000);

    console.log(this.usedUser); 
  }
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    address: this.fb.group({
      // <- another group of element
      street: [''],
      postCode: ['', Validators.required],
      email:['',Validators.required],
    }),
  });
  isEditing = false;
  isLoading = true;
  error: any;
  user:any ;
  companyForm!: FormGroup;

  companyData!: Observable<User> ;
  // companyData:Observable<User>|undefined;
  saveChanges() {}

  // onSaveClick(){ }
  // onCancelClick(){ }
  testUser(){
    // this.firebaseService.getCurrentUserID();
    console.log("hello");
  }
  delay() {
    setTimeout(() => {}, 2000);
  }
  cancelEdit() {
    this.isEditing = false;
  }

  editCompanyProfile() {
    this.isEditing = true;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

 updateCompanyProfile() {
    const companyName = this.contactForm.value.companyName;
    const description = this.contactForm.value.description;
    const email = this.contactForm.value.email; 
    const contactInfo = this.contactForm.value.contactInfo;

this.companyData.subscribe(user => {
  user.name = companyName;
  user.companyContactInfo = contactInfo;
  user.companyDescription = description;
  user.email = email;
  console.log(user);
    
   this.CompanyService.updateUser(user);

  this.isEditing = false;

  });
 
  }
}
