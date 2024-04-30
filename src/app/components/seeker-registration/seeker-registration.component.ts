import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-seeker-registration',
  templateUrl: './seeker-registration.component.html',
  styleUrl: './seeker-registration.component.css'
})
export class SeekerRegistrationComponent {

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  role: string = 'seeker';

  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore
  ) { }
  async handleSeekerRegistration() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password).then((res) => {
      this.db.collection("users").doc(res.user?.uid).set({
        name: this.name,
        email: this.email,
        role: this.role,
        appliedJobs: []
      });
    }).finally(() => {
      window.location.href = "/login";
    }).catch((e) => { console.log(e) })
  }
}
