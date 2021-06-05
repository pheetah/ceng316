import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { CurrentProgress } from '../dashboard/services/current_progress.service';
import { AdvisorsService } from './services/advisors-service';

let response$ = new Subject<Array<IAdvisorsList>>();
let progressStatus= false;

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
    private currentProgress$:CurrentProgress,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.currentProgress$.currentProgress$.subscribe((progress:string)=> {
      if(progress == 'Education Program'){
        this.snackbar.open('You should first upload your T.S.S File!', 'close', {
          duration: 4000
        });
      }else{
        progressStatus = true;
      }
    });
    
    this.advisorsService.getAdvisors().subscribe((advisors:any) => {
      this.response = advisors;
      response$.next(this.response);
      this.dataSource = new MatTableDataSource<IAdvisorsList>(this.response);
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
    @Inject(MAT_DIALOG_DATA) data:any,
    private advisorsService:AdvisorsService,
    private snackbar: MatSnackBar,
    private currentProgress$:CurrentProgress,
  ) {
    this.dialogContent = data;
  }
  
  dialogContent:any;

  onClickProposeBtn(){
    if(!progressStatus){
        this.snackbar.open('You should first upload your T.S.S File!', 'close', {
          duration: 4000
        });
      }else{
        this.advisorsService.postAdvisors(this.dialogContent.email).subscribe((val:any) =>{
          if(val.status === true){
            this.snackbar.open('proposed', 'close', {
              duration: 2000
            });
          }
          else if(val.status === false){
            this.snackbar.open('you cant propose multiple times', 'close', {
              duration: 2000
            });
          }
    
          this.advisorsService.getAdvisors();
        });
      }
  }

  onClickCloseBtn(){
    this.dialogRef.close();
  }

}