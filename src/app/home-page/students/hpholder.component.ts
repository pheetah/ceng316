import { ObserversModule } from '@angular/cdk/observers';
import { Component, Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  response = new Array<IStudentsList>();
  dataSource = new MatTableDataSource<IStudentsList>(this.response);

  constructor(
    public dialog: MatDialog,
    private studentsService: StudentsService
  ){}

  ngOnInit(){
    this.studentsService.mockStudents().subscribe((val:any) => {
      this.response = val.students;
      response$.next(this.response);
      this.dataSource = new MatTableDataSource<IStudentsList>(this.response);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(index:number){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.response[index];
    dialogConfig.width = "500px";
    this.dialog.open(DialogContentExample, dialogConfig);
  }

  onAcceptClick(event:any){
    event.stopPropagation();
    console.log('accepted');
  }

  onRejectClick(event:any){
    event.stopPropagation();
    console.log('rejected');
  }
}

export interface IStudentsList {
  student_name: string;
  department: string;
  branch: string;
}