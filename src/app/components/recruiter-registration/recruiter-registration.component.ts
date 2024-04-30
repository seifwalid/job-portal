import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-recruiter-registration',
  templateUrl: './recruiter-registration.component.html',
  styleUrls: ['./recruiter-registration.component.css']
})
export class RecruiterRegistrationComponent {

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  role: string = 'recruiter'; // Role set to 'recruiter'

  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore) { }

  async handleRecruiterRegistration() {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(this.email, this.password);

      await this.db.collection("users").doc(res.user?.uid).set({
        name: this.name,
        email: this.email,
        role: this.role,
        postedJobsIds: []
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }
}
