import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isAuthenticated: boolean = false;
  email: string = "";
  password: string = "";
  user: any | null = {};

  constructor(public readonly auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe((user: any) => {
      this.isAuthenticated = !!user;
      this.user = user;
      console.log('user', user?.uid ?? null);
    });
  }

  signOut() {
    this.auth.signOut();
  }

  signIn() {
    this.auth.signInWithEmailAndPassword("admin@gmail.com", "Admin123");
  }
}
