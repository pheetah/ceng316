import { ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import {  Subject } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { studentUpdated } from './state-mgmt/students-actions';
import { selectAcceptedStudents, selectAllStudents, selectProposedorRejectedStudents } from './state-mgmt/students-selectors';

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

  dataSourceAccepted = new MatTableDataSource<IStudents>();
  dataSourcePending = new MatTableDataSource<IStudents>();

  constructor(
    public dialog: MatDialog,
    //private studentsService: StudentsService,
    private router:Router,
    private snackbar: MatSnackBar,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    // this.studentsService.getStudents().subscribe((val:any) => {
    //   this.response = val;
    //   this.accepted = this.response.accepted;
    //   this.pendingOrRejected = this.response.proposes;
    //   this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
    //   this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);
    // });

    this.store.pipe(select(selectAllStudents)).subscribe(val => console.log('kiki',val))

    this.store.pipe(select(selectAcceptedStudents)).subscribe(acceptedStudents =>{
      console.log('ihi', acceptedStudents);
      this.accepted = acceptedStudents;
      this.dataSourceAccepted = new MatTableDataSource<IStudents>(acceptedStudents);
    });

    this.store.pipe(select(selectProposedorRejectedStudents)).subscribe(proposed => {
      console.log(proposed);
      this.pendingOrRejected = proposed;
      this.dataSourcePending = new MatTableDataSource<IStudents>(proposed);
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
    // this.studentsService.postStudents(this.pendingOrRejected[index].email, true).subscribe((val:any) => {
    //   this.snackbar.open('accepted student', 'close', {
    //     duration: 2000
    //   });
    //   this.studentsService.getStudents().subscribe(val => {
    //     this.response = val;
    //     this.accepted = this.response.accepted;
    //     this.pendingOrRejected = this.response.proposes;
    //     this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
    //     this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);  
    //   });
    // });

    console.log('hehe', this.pendingOrRejected)

    // const update:Update<IStudents> = {
    //   id: this.pendingOrRejected[index].email,
    //   changes: this.pendingOrRejected[index].status
    // }

    const student:IStudents = {
      ...this.pendingOrRejected[index],
      ...{status : true}
    }
  
    const update:Update<IStudents> = {
      id: student.email,
      changes: student
    }

    this.store.dispatch(studentUpdated({update}));

    this.snackbar.open('accepted student', 'close', {
      duration: 2000
    });
  }

  onRejectClick(event:any, index:number){
    event.stopPropagation();
    // this.studentsService.postStudents(this.pendingOrRejected[index].email, false).subscribe((val:any) => {
    //   this.snackbar.open('rejected student', 'close', {
    //     duration: 2000
    //   });
    //   this.studentsService.getStudents().subscribe(val => {
    //     this.response = val;
    //     this.accepted = this.response.accepted;
    //     this.pendingOrRejected = this.response.proposes;
    //     this.dataSourceAccepted = new MatTableDataSource<IStudentsList>(this.accepted);
    //     this.dataSourcePending = new MatTableDataSource<IStudentsList>(this.pendingOrRejected);  
    //   });
    // });

    const student:IStudents = {
      ...this.pendingOrRejected[index],
      ...{status : false}
    }
  
    const update:Update<IStudents> = {
      id: student.email,
      changes: student
    }

    this.store.dispatch(studentUpdated({update}));

    this.snackbar.open('rejected student', 'close', {
      duration: 2000
    });
  }
}

export interface IStudentsList {
  proposes:Array<IStudents>,
  accepted:Array<IStudents>
}

export interface IStudents{
  name: string;
  department: string;
  branch: string;
  status:boolean
  email:string
}