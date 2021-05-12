import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UploadService } from './services/uplaod-service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent{

  file!:File;
  response:any;

  constructor(
    private uploadService:UploadService
  ){}

  uploads: FormGroup = new FormGroup({});

  uploadFile(event:any) {
    this.file = (event.target).files[0];
    console.log(this.file);
  }

  upload(){
    this.uploadService.upload(this.file).subscribe(val => {
      console.log(val);
    });
  }

  ngOnInit(){}

  DocUpload(event:any){
    console.log(event);
  }
}