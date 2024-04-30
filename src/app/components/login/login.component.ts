import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isAuthenticated: boolean = false;
  @Input() email: string = "";
  @Input() password: string = "";
  authUser: any | null = {};
  dbUser: any | null = {};
  role: "seeker" | "recruiter" | null = null;

  constructor(public readonly auth: AngularFireAuth, private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe((user: any) => {
      if (user) {
        this.db.collection("users").doc(user.uid).valueChanges().subscribe((u: any) => {
          if (u && u.role === "seeker") {
            window.location.href = "/seeker";
          }
          else if (u && u.role === "recruiter") {
            window.location.href = "/recruiter";
          }
        })
      }
    });
  }

  async handleLogin() {
    this.isAuthenticated = true;
    this.auth.signInWithEmailAndPassword(this.email, this.password).then((res) => {
      this.db.collection("users").doc(res.user?.uid).valueChanges().subscribe((u: any) => {
        if (u && u.role === "seeker") {
          window.location.href = "/seeker";
        }
        else if (u && u.role === "recruiter") {
          window.location.href = "/recruiter";
        }
      })
    }).catch((e) => { console.log(e) })
  }
}
