import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class StudentsService {
  
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

     public mockStudents(){
        const response = {
            "students": [
                {
                  "student_name": "eric lamela",
                  "branch": "software testing",
                  "department": "computer engineering",
                  "state": "accepted"
                },
                {
                    "student_name": "john doe",
                    "branch": "computer vision",
                    "department": "computer engineering",
                    "state": "rejected"
                },
                {
                    "student_name": "ahmet mehmet",
                    "branch": "computer vision",
                    "department": "computer engineering",
                    "state": "pending"
                },
            ]
          }
        ;
    
        let obs = new Observable((subscriber) => {
            setTimeout(()=>{
                subscriber.next(response);
                subscriber.complete();
            }, 1000);
        }).pipe();
        return obs;
    }
  
}  