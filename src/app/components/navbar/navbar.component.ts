import { Observable, observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { CompanyService } from './../../services/companyService/company.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string = '';
  user!:Observable<User>;
  constructor(private auth: AngularFireAuth, private router: Router , private companyService:CompanyService ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
       this.user = this.companyService.getCurrentUserData();
      }
    });
    
    // Fetch user data if logged in
    
  
  }
    Test(user:any){
      console.log(user);
    }
  logout(): void {
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}
