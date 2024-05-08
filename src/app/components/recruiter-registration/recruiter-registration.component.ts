import { Job } from './../../models/Job';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-recruiter-registration',
  templateUrl: './recruiter-registration.component.html',
  styleUrls: ['./recruiter-registration.component.css']
})
export class RecruiterRegistrationComponent {

  @Input() name: string = '';
  //  @Input() email: string = '';
  //  @Input() password: string = '';
   @Input() companyDescription: string = ''; 
   @Input() companyContactInfo: string = ''; 
   @Input() profilePic: string = '';
   url!: string;
  role: string = 'recruiter'; // Role set to 'recruiter'

 form!: FormGroup 

  
  constructor(private fb: FormBuilder,public readonly auth: AngularFireAuth, private db: AngularFirestore, private storage :AngularFireStorage) {
  
   }
  
   get f() { return this.form.controls; }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path= `test/${file.name}`;
      const upload = await this.storage.upload(path,file);
      this.url = await upload.ref.getDownloadURL();
     
    }
  }

  async ngOnInit() {
    this.form = this.fb.group({
     name: ['', Validators.required],
      email: ['', Validators.email],
     password: ['', Validators.minLength(6)],
     companyDescription: ['', Validators.required],
      companyContactInfo: ['', Validators.required],
     

    });
  }
  async handleRecruiterRegistration() {
    try {
      console.log(this.form.value.email)
      console.log(this.form.value.name)
    console.log(this.form.value.password)
      const res = await this.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password);
      
      await this.db.collection("users").doc(res.user?.uid).set({
        name: this.name,
        email: this.form.value.email,
        role: this.role,
        companyDescription: this.form.value.companyDescription, 
        companyContactInfo: this.form.value.companyContactInfo, 
        postedJobsIds: [],
        profilePic: this.url,
        applicants: []
      });
    
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (e: any) {
      
      console.log(e);
    }


  }
  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    if (control) {
      return control.invalid && (control.touched || control.dirty);
    }
    return false;
  }
  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (!control) return '';

    const errors = control.errors;
    if (!errors) return '';

    if (errors['required']) return 'You must enter a value';
    if (errors['email']) return 'Not a valid email';
    if (errors['minlength']) return 'Password must be at least 6 characters long';
    
    return '';
  }
}
