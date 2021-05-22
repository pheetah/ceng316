import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/login.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { login } from './state-mgmt/auth-actions';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {

  hide:boolean = true;
  cookieValue:any;

  constructor(
    private cookieService:CookieService,
    private authService:AuthService,
    private router:Router,
    private store:Store<AppState>
    ){}

  ngOnInit(){}

  email = new FormControl('', [Validators.required, Validators.email]);

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });

  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a proper email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onLoginClick(){
    this.authService.login(this.signin.value).pipe(
      tap(token =>{
        const LoginAction = login({token:token});
        this.store.dispatch(LoginAction);
      })
    ).subscribe();

  }

}