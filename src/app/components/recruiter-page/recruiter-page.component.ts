import { UserService } from './../../services/UserService/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter-page',
  templateUrl: './recruiter-page.component.html',
  styleUrl: './recruiter-page.component.css'
})
export class RecruiterPageComponent {

  constructor(private readonly user: UserService) { }

  // async test() {
  //   console.log("hello");
  //   const user = this.fire.getUser();
  //   console.log(user);
  // }
  async getSpecificUser() {

  }

}
