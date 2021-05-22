import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../sign/services/login.service';
import jwt_decode from "jwt-decode";
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginSelector } from '../sign/state-mgmt/auth-selectors';
import { logout, login } from '../sign/state-mgmt/auth-actions';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent {

  //isLoggedin:boolean = false;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;

  constructor(
    public authService:AuthService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>
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

    const token = localStorage.getItem("token");

    if (token) {
      this.store.dispatch(login({token: token}));
    }

    this.isLoggedIn$ = this.store.pipe(
      //map((state:any) => !!state["auth"].user),
      //distinctUntilChanged()
      
      
      //select((state:any) => !!state["auth"].user)
    
      select(LoginSelector)
    );




    // this.authService.LoginStatus().subscribe(val => {});
    // this.isLoggedin = this.authService.loggedIn;
    // this.authService.loginType$.next(jwt_decode<any>(localStorage.getItem('token')!).user_type);
    // this.authService.loginType$.subscribe(val => {
    // });
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
    public authService:AuthService,
    private store: Store<AppState>
    ) {}

  onQuitClick(): void {
    //this.authService.Logout();
    this.store.dispatch(logout());

    this.router.navigate(['sign']);
    this.dialogRef.close();
  }

  onCloseClick(){
    this.dialogRef.close();
  }

}