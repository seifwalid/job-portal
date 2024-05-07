import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recruiter-registration',
  templateUrl: './recruiter-registration.component.html',
  styleUrls: ['./recruiter-registration.component.css']
})
export class RecruiterRegistrationComponent {

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() companyDescription: string = ''; 
  @Input() companyContactInfo: string = ''; 
  @Input() profilePic: string = '';
 
  url!: string;
  role: string = 'recruiter'; // Role set to 'recruiter'

  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore, private storage :AngularFireStorage) { }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const path= `test/${file.name}`;
      const upload = await this.storage.upload(path,file);
      this.url = await upload.ref.getDownloadURL();
     
    }
  }
 
  async handleRecruiterRegistration() {
    try {
      
    
      const res = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      
      await this.db.collection("users").doc(res.user?.uid).set({
        name: this.name,
        email: this.email,
        role: this.role,
        companyDescription: this.companyDescription, 
        companyContactInfo: this.companyContactInfo, 
        postedJobsIds: [],
        profilePic: this.url

      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
}
