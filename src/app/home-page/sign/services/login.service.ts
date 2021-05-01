import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    loginCheck$ = new BehaviorSubject<boolean>(this.loggedIn);
  
    constructor(private http: HttpClient) { }
  
    /*public login = () =>{

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        
        return this.http.post('http://127.0.0.1:8000/auth/login', {
        headers:headers,
        params:{
           email: 'abc@iyte.edu.tr',
           password: 'xyz',
        }
       }).pipe(
         catchError(error => {
           throw new Error(error);
         })
        );
     }*/

     public mockLogin(){
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
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('token') !== null);
    }

    public LoginStatus(){
        return this.loginCheck$;
    }
  
  }  