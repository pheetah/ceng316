import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../sign/services/login.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent {

  isLoggedin:boolean = false;

  constructor(
    public authService:AuthService,
    private router: Router,
    public dialog: MatDialog
    ){}

  onLogoutClick(){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '350px',
      height: '150px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {});

  }

  ngOnInit(){
    this.authService.LoginStatus().subscribe(val => {});
    this.isLoggedin = this.authService.loggedIn;
  }

}

@Component({
  selector: 'logout-dialog',
  templateUrl: 'logout-dialog.html',
  styleUrls: ['./home-component.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router: Router,
    public authService:AuthService
    ) {}

  onQuitClick(): void {
    this.authService.Logout();
    this.router.navigate(['sign']);
    this.dialogRef.close();
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}