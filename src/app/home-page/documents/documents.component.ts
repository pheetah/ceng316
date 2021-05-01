import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent{
  afuConfig = {
    formatsAllowed: '.pdf,.docx,.rar',
    uploadAPI: {
      url:"https://www.filestackapi.com/api/store/S3?key=A42D55VZRDiWGuqcGukGwz",
      headers: {
      "Content-Type" : "Content-Type:image/png"
      }
    }
  };

  DocUpload(event:any){
    console.log(event);
  }
}