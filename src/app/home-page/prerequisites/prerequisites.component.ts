import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PrerequisitesService } from './services/prerequisites.service';
import * as FileSaver from 'file-saver';
import { DownloadService } from './services/download.service';

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {

  public routeParams;
  public conditions!:Conditions;
  public files!:any;

  displayedColumns = ['files', 'symbol'];
  fileUrl!:any;

  dataSource = new MatTableDataSource<any>(this.files);

  constructor(
    private router:Router,
    private prerequisitesService: PrerequisitesService,
    private sanitizer: DomSanitizer,
    private downloadService:DownloadService
  ){
    console.log('checks: ', this.router.getCurrentNavigation()?.extras.state);
    this.routeParams = this.router.getCurrentNavigation()?.extras.state;
  }

  onDownloadClick(event:any, index:number){
    event.stopPropagation();
    //console.log(this.files[index]);
    // console.log(window.location.origin);
    //const blob = new Blob([this.files[index]], { type: this.files[index].media_type});
    //const url= window.URL.createObjectURL(blob);
    //window.open(url);
    console.log('selected file', this.files[index]);
    this.downloadService.download(this.files[index].id).subscribe(val =>{
      console.log('val:', val);
      const blob = val;    
      const url= window.URL.createObjectURL(blob);
      window.open(url);
    },
    error => {console.log('error', error);}
    );


    //console.log('http://127.0.0.1:8000'+this.files[index].path.substring(1));
    //this.fileUrl= 'http://127.0.0.1:8000/backend'+this.files[index].path.substring(1);

    // let link = document.createElement("a");
    // link.download = "filename";
    // link.href = 'http://127.0.0.1:8000/files/mematibas/assignment_3.pdf';
    // link.click();

    //FileSaver.saveAs(this.fileUrl, "report.pdf");

  }

  ngOnInit(): void {
    console.log(this.routeParams!.student.email);
    this.prerequisitesService.getPrerequisites(this.routeParams!.student.email).subscribe((response:PrerequisitesResponse) => {
      console.log('response', response);
      this.conditions = response.conditions;
      this.files = response.files;
      this.dataSource = new MatTableDataSource<any>(this.files);
    });
  }

}

export interface PrerequisitesResponse{
  conditions: Conditions,
  files:any
}

interface Conditions{
  akts:boolean,
  c4:boolean,
  cons:boolean,
  course_count:boolean,
  credit_count:boolean,
  ethic:boolean,
  grade:boolean,
  term:boolean
}