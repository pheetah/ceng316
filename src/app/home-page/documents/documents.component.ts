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
    var re = /pdf/gi;
    var re2 = /zip/gi;
    var re3 = /docx/gi;
    var re4 = /rar/gi;
    
    if (this.file.size<20000000) 
    {
        document.getElementsByClassName('Fsize')[0].innerHTML= "";
    }

    if (this.file.size>=20000000) {
      document.getElementsByClassName('Fsize')[0].innerHTML="This file is bigger than 20 MB. Please upload file under 20 MB";
      console.log('This file is bigger than 20 MB. Please upload file under 20 MB');
    }
  
    if(this.file.name.search(re)== -1 &&this.file.name.search(re2)== -1&& this.file.name.search(re3)== -1&&this.file.name.search(re4)== -1){
    document.getElementsByClassName('Ftype')[0].innerHTML="Invalid Type";
    }
    else {
      document.getElementsByClassName('Ftype')[0].innerHTML= "";
    }

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