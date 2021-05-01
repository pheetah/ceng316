import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/login.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {

  hide:boolean = true;

  constructor(
    private cookieService:CookieService,
    private authService:AuthService,
    private router:Router){}

  email = new FormControl('', [Validators.required, Validators.email]);

  cookieValue:any;

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
    this.authService.mockLogin().subscribe((val:any) =>{
      let decoded:any = jwt_decode(val.token);
      this.authService.loginCheck$.next(true);
      this.router.navigate(['dashboard']);
    });
  }

}