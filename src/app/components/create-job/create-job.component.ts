import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css',
})
export class CreateJobComponent implements OnInit {
  jobForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      qualifications: ['', Validators.required],
    });
  }



  onSubmit() {
    if (this.jobForm.valid) {
      // Process the form data here, for example, send it to a backend API
      console.log(this.jobForm.value);
      // You can reset the form after submission if needed
      this.jobForm.reset();
    } else {
      // Handle invalid form
    }
     const newjob= {
        title: this.jobForm.value.title,
        description: this.jobForm.value.description,
        location: this.jobForm.value.location,
        salary: this.jobForm.value.salary,
        qualifications: this.jobForm.value.qualifications,
        companyName: "google",
     }
    console.log("this.jobForm.value");
  }


}
