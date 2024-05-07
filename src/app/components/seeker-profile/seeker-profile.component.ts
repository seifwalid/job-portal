import { CompanyService } from './../../services/companyService/company.service';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeekerService } from '../../services/seekerService/seeker.service';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-seeker-profile',
  templateUrl: './seeker-profile.component.html',
  styleUrl: './seeker-profile.component.css',
})
export class SeekerProfileComponent {
  constructor(
    public sanitizer: DomSanitizer,
    private companyService: CompanyService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private seekerService: SeekerService
  ) {}

  resumeEnabled: boolean = true;
  picEnabled: boolean = true;

  profilePicUrl: any = null;
  resumeUrl: any =null;
  User!: Observable<User>;
  contactForm!: FormGroup;
  isEditing = false;
  isLoading = true;
  error: any;
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      profilePic: ['', Validators.required],
      resume: ['', Validators.required],
    });
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.User = this.companyService.getCurrentUserData();
    console.log("i have been here ");
      console.log(this.User);
    }, 2000);
  }

  updateCompanyProfile() {
    const Name = this.contactForm.value.userName;
    const email = this.contactForm.value.email;

    this.User.subscribe((user) => {
      user.name = Name;
      user.email = email;
      console.log(user);
      if(this.profilePicUrl!=null){
        user.profilePic = this.profilePicUrl;
        console.log("ana 3adelt el profile pic");
      }
      if(this.resumeUrl!=null){
        user.resume = this.resumeUrl;
        console.log(user.resume);
      }

      console.log(user);

      this.companyService.updateUser(user);

      this.isEditing = false;
    });
  }

  async onResumeChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.resumeEnabled = true;
      const path = `test/${this.companyService.getCurrentUserID()}/${file.name}`;
      const upload = await this.storage.upload(path, file);
      this.resumeUrl = await upload.ref.getDownloadURL();
      this.resumeEnabled = true;
    }
  }
  editUserProfile() {
    this.isEditing =!this.isEditing;
  }
  async onProfileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.picEnabled = false;
      const path = `test/${this.companyService.getCurrentUserID()}/${file.name}`;
      const upload = await this.storage.upload(path, file);
      this.profilePicUrl = await upload.ref.getDownloadURL();
      this.picEnabled = true;
    }
  }
}
