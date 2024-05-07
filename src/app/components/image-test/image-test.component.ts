import { CompanyService } from './../../services/companyService/company.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import{AngularFireModule} from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-image-test',
  templateUrl: './image-test.component.html',
  styleUrl: './image-test.component.css'
})
export class ImageTestComponent {

  selectedFile: any;
  uploadPercent: number = 0;
  downloadURL: string = '';
constructor(private firesStorage :AngularFireStorage) { }

ngOnInit():void{

}


onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}
 async onFileChange(event: any) {

    const file = event.target.files[0]; 
    if(file){
     const path= `test/${file.name}`;
      const upload = await this.firesStorage.upload(path,file);
      const url = await upload.ref.getDownloadURL();
      console.log(url);
    }

  }
}
