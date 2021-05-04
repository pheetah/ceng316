import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class AdvisorsService {
  
    constructor(private http: HttpClient) { }
  
    /*public login = () =>{

        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': ''
        });

        const params = new HttpParams()
        .set('email', 'Ellipsis@iyte.edu.tr')
        .set('password', 'string')
        .set('user_type', 'student');

        
        return this.http.post('http://127.0.0.1:8000/auth/login', {
        headers:headers,
        params: params
       }).pipe(
         catchError(error => {
           throw new Error(error);
         })
        );
     }*/

     public mockAdvisors(){
        const response =   {
            "advisors": [
                {
                  "name": "ahmet mehmet1",
                  "branch": "computer vision",
                  "department": "computer engineering",
                  "proposed": true,
                  "state": "accepted"
                },
                {
                    "name": "ahmet mehmet2",
                    "branch": "data science",
                    "department": "computer engineering",
                    "proposed": false,
                    "state": "rejected"
                },
                {
                    "name": "ahmet mehmet3",
                    "branch": "software testing",
                    "department": "computer engineering",
                    "proposed": false,
                    "state": "accepted"
                }
            ]
        };
    
        let obs = new Observable((subscriber) => {
            setTimeout(()=>{
                subscriber.next(response);
                subscriber.complete();
            }, 1000);
        }).pipe();
        return obs;
    }
  
}  