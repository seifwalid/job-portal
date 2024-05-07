import { CompanyService } from './../../services/companyService/company.service';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { InputText } from 'primeng/inputtext';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-seeker-registration',
  templateUrl: './seeker-registration.component.html',
  styleUrl: './seeker-registration.component.css'
})
export class SeekerRegistrationComponent {

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() profilePic: string = '';
  @Input() resume: string = '';
  picEnabled: boolean = false;
  resumeEnabled: boolean = false;
  profilePicUrl!: string;
  resumeUrl!: string;
  role: string = 'seeker';
  res:any;
  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore
  ,private companyService:CompanyService , private storage :AngularFireStorage) { }

  ngOnInit(): void {

  }
  async handleSeekerRegistration() {
    console.log("handeling regestration");
    try {
      this.res = await this.auth.createUserWithEmailAndPassword(this.email, this.password);

      await this.db.collection("users").doc(this.res.user?.uid).set({
        name: this.name,
        email: this.email,
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
  
}
