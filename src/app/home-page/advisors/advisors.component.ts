import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { AdvisorsService } from './services/advisors-service';

let response$ = new Subject<Array<IAdvisorsList>>();

interface IAdvisorsList {
  name: string,
  branch: string,
  department: string,
  proposed: boolean,
  state: string
}

@Component({
  selector: 'app-advisors',
  templateUrl: './advisors.component.html',
  styleUrls: ['./advisors.component.css']
})
export class AdvisorsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'researchfields', 'department'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  response = new Array<IAdvisorsList>();
  dataSource = new MatTableDataSource<IAdvisorsList>(this.response);


  constructor(
    private advisorsService:AdvisorsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.advisorsService.getAdvisors().subscribe((advisors:any) => {

      this.response = advisors;
      response$.next(this.response);
      this.dataSource = new MatTableDataSource<IAdvisorsList>(this.response);

      /*this.response = val.advisors;
      response$.next(this.response);
      this.dataSource = new MatTableDataSource<IAdvisorsList>(this.response);*/
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(index:number){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.response[index];
    dialogConfig.width = "500px";
    this.dialog.open(AdvisorsDialog, dialogConfig);
  }

}

@Component({
  selector: 'advisors-dialog',
  templateUrl: 'advisors-dialog.html',
  styleUrls: ['./advisors.component.css']
})
export class AdvisorsDialog {
  constructor( 
    public dialogRef: MatDialogRef<AdvisorsDialog>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    this.dialogContent = data;
  }
  
  dialogContent:any;

  onClickCloseBtn(){
    this.dialogRef.close();
  }

}