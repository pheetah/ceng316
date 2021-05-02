import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFileUploaderComponent } from 'angular-file-uploader';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent{

  @ViewChild('fileUpload') private fileUpload!:  AngularFileUploaderComponent;

  afuConfig = {
    formatsAllowed: '.pdf,.docx,.rar',
    uploadAPI: {
      url:"https://www.filestackapi.com/api/store/S3?key=A42D55VZRDiWGuqcGukGwz",
      headers: {
      "Content-Type" : "Content-Type:image/png"
      }
    },
    hideSelectBtn : true,
    replaceTexts: {
      uploadBtn: 'Submit Document',
    }
  };

  togglePermissionCheck(event:boolean){
    this.fileUpload.hideSelectBtn = !event;
  }

  DocUpload(event:any){
    console.log(event);
  }
}