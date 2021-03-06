import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadService } from './services/uplaod-service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent{

  file!:File;
  response:any;
  fileSize!:string; 
  check:boolean = false;
  state = this;
  uploadStatus = "T.S.S Date";
  
  constructor(
    private uploadService:UploadService,
    private snackbar: MatSnackBar
  ){}

  uploads: FormGroup = new FormGroup({});
 
  uploadFile(event:any) {

  let state= this.state;
  const ele = document.getElementById("checking") as HTMLInputElement;
   (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
   ele.checked=false;
    this.file = (event.target).files[0];
    var re = /pdf/gi;
    var re2 = /zip/gi;
    var re3 = /docx/gi;
    var re4 = /rar/gi;
    
 
    if (this.file.size<20000000) 
    {     
    document.getElementsByClassName('Fsize')[0].innerHTML='';
  
     if(this.file.name.search(re)== -1 &&this.file.name.search(re2)== -1&& this.file.name.search(re3)== -1&&this.file.name.search(re4)== -1){
        document.getElementsByClassName('Ftype')[0].innerHTML="Invalid Type";
        (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
        state.check = false;
      }
      else {
        state.check = true;
        document.getElementsByClassName('Ftype')[0].innerHTML='';
       ele.onchange = function(){
      if(ele.checked && state.check){
        (document.getElementById("myBtn") as HTMLButtonElement).disabled = false;
      }else {
        (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
      }
      }
    }
    }

    else if (this.file.size>=20000000) {
    document.getElementsByClassName('Fsize')[0].innerHTML="This file is bigger than 20 MB. Please upload file under 20 MB";
     (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
     state.check = false;
    if(this.file.name.search(re)== -1 &&this.file.name.search(re2)== -1&& this.file.name.search(re3)== -1&&this.file.name.search(re4)== -1){
   document.getElementsByClassName('Ftype')[0].innerHTML="Invalid Type";
  }
   
}
  }

  upload(){
    this.uploadService.upload(this.file, this.uploadStatus).subscribe((isUploadSuccessful:any) => {
      if(isUploadSuccessful.status === true){
        this.snackbar.open('upload successful', 'close', {
          duration: 2000
        });
      }else if(isUploadSuccessful.status === false){
        this.snackbar.open('upload failed', 'close', {
          duration: 2000
        });
      }

      (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
      document.getElementsByClassName('Success')[0].innerHTML="Upload Successfully";
    });
  }

  ngOnInit(){
    (document.getElementById("myBtn") as HTMLButtonElement).disabled = true;
    this.uploadService.getUploadStatus().subscribe((fileStatus:any) => {
      this.uploadStatus = fileStatus.current;
    });
  }

}