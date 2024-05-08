import { CompanyService } from './../../services/companyService/company.service';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-seeker-registration',
  templateUrl: './seeker-registration.component.html',
  styleUrl: './seeker-registration.component.css'
})
export class SeekerRegistrationComponent {

  // @Input() name: string = '';
  // @Input() email: string = '';
  // @Input() password: string = '';
  @Input() profilePic: string = '';
  @Input() resume: string = '';
  picEnabled: boolean = false;
  resumeEnabled: boolean = false;
  profilePicUrl!: string;
  resumeUrl!: string;
  role: string = 'seeker';
  res:any;

  form!:FormGroup
  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore
  ,private companyService:CompanyService ,private fb:FormBuilder, private storage :AngularFireStorage) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.email],
      password:['',Validators.minLength(6)],})
  }
  async handleSeekerRegistration() {
    console.log("handeling regestration");
    try {
      this.res = await this.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password);

      await this.db.collection("users").doc(this.res.user?.uid).set({
        name: this.form.value.name,
        email: this.form.value.email,
        role: this.role,
        appliedJobsIds: [],
        savedJobsIds: [],
        profilePic: this.profilePicUrl,
        resume: this.resumeUrl
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async onResumeChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `test/users/${file.name}`;
      const upload = await this.storage.upload(path, file);
      this.resumeUrl = await upload.ref.getDownloadURL();
      console.log(this.resumeUrl);
      this.resumeEnabled = true;
    }
  }

  async onProfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path = `test/users/${file.name}`;
      const upload = await this.storage.upload(path, file);
      this.profilePicUrl =await upload.ref.getDownloadURL();
      this.picEnabled = true;
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
