import { Firestore } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';
import { FirebaseService } from './../../services/firebaseService/firebase.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isAuthenticated: boolean = false;
  email: string = '';
  password: string = '';
  user: any | null = {};
  user$: Observable<User> | undefined; 
  constructor(
    public readonly auth: AngularFireAuth,
    private fire: FirebaseService
  ) {}

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

  test() {
    this.user$ = this.fire.getUser();
   
  }

  signIn() {
    this.auth.signInWithEmailAndPassword('admin@gmail.com', 'Admin123');
  }
}
