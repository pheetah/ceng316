import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ISignIn } from "../models/sign-in-model";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    loginType$ = new ReplaySubject<any>(1);
  
    constructor(private http: HttpClient) { }
  
    public login = (signin:ISignIn) =>{
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': 'application/json',
        });
        
        return this.http.post('http://127.0.0.1:8000/auth/login', { email: signin.email, password: signin.password }).pipe(
         catchError(error => {
           throw new Error(error);
         })
        ).pipe(
            tap((result:any) => {}),
        );;
    }

    /* public mockLogin(){
        const response = {
         "name": "abc",
         "active": "true",
         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MTk4MTk3NjIsImV4cCI6MTY1MTM1NTc5OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJfdHlwZSI6InN0dWRlbnQifQ.SlQX3T-CjixY1XwLs59biCY4Mgjkh4vuBq9XlVWslMs"
        };
    
        let obs = new Observable((subscriber) => {
            setTimeout(()=>{
                subscriber.next(response);
                subscriber.complete();
            }, 3000);
        }).pipe(
            tap((result:any) => localStorage.setItem('token', result.token))
        );
        return obs;
    }*/
  
}  