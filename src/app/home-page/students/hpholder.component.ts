import { ObserversModule } from '@angular/cdk/observers';
import { Component, Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StudentsService } from './services/students-service';

let response$ = new Subject<Array<IStudentsList>>();

@Component({
  selector: 'students-dialog',
  templateUrl: 'students-dialog.html',
  styleUrls: ['./hpholder.component.css']
})
export class DialogContentExample {
  constructor( 
    public dialogRef: MatDialogRef<DialogContentExample>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    this.dialogContent = data;
  }
  
  dialogContent:any;

  onClickCloseBtn(){
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-hpholder',
  templateUrl: './hpholder.component.html',
  styleUrls: ['./hpholder.component.css']
})
export class HpholderComponent{

  displayedColumns: string[] = ['name', 'researchfields', 'department', 'symbol'];
  displayedColumnsAccepted: string[] = ['name', 'researchfields', 'department'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  response:any;
  accepted:any;
  pendingOrRejected:any;

  dataSourceAccepted = new MatTableDataSource<IStudentsList>();
  dataSourcePending = new MatTableDataSource<IStudentsList>();

  constructor(
    public dialog: MatDialog,
    private studentsService: StudentsService,
    private router:Router,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    // this.studentsService.mockStudents().subscribe((val:any) => {
    //   console.log(val);
    //   this.response = val.students;
    //   this.accepted = this.response.filter((element:any) => element.state === 'accepted');
    //   let rejected = this.response.filter((element:any) => element.state === 'pending');
    //   this.pendingOrRejected = rejected.concat(this.response.filter((element:any) => element.state === 'rejected'));
    //   this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
    //   this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);
    //   //response$.next(this.response);
    // });

    this.studentsService.getStudents().subscribe((val:any) => {
      console.log('getStudents:', val);
      this.response = val;
      this.accepted = this.response.accepted;
      this.pendingOrRejected = this.response.proposes;
      this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
      this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);
    });
  }

  ngAfterViewInit() {
    this.dataSourceAccepted.paginator = this.paginator;
    this.dataSourcePending.paginator = this.paginator;
  }

  onRowClick(index:number){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.pendingOrRejected[index];
    dialogConfig.width = "500px";
    this.dialog.open(DialogContentExample, dialogConfig);
  }

  onAcceptedRowClick(i:number){
    this.router.navigate(["/prerequisites"], { state: {student: this.accepted[i]} } );
  }

  onAcceptClick(event:any, index:number){
    event.stopPropagation();
    console.log('accepted', this.pendingOrRejected[index]);
    this.studentsService.postStudents(this.pendingOrRejected[index].email, true).subscribe((val:any) => {
      console.log('value', val);
      this.snackbar.open('accepted student', 'close', {
        duration: 2000
      });
      this.studentsService.getStudents().subscribe(val => {
        console.log('anan', this.response);
        this.response = val;
        this.accepted = this.response.accepted;
        this.pendingOrRejected = this.response.proposes;
        this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
        this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);  
      });
    });
  }

  onRejectClick(event:any, index:number){
    event.stopPropagation();
    console.log('rejected', this.pendingOrRejected[index]);
    this.studentsService.postStudents(this.pendingOrRejected[index].email, false).subscribe((val:any) => {
      console.log('posted students: ', val);
      this.snackbar.open('rejected student', 'close', {
        duration: 2000
      });
      this.studentsService.getStudents().subscribe(val => {
        this.response = val;
        this.accepted = this.response.accepted;
        this.pendingOrRejected = this.response.proposes;
        this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
        this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);  
      });
    });
  }
}

export interface IStudentsList {
  name: string;
  department: string;
  branch: string;
  state:string
}