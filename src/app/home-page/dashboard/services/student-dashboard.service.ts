import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class StudentDashboardService {
  
    constructor(private http: HttpClient) { }
  
    public getStudentDashboard = () =>{

        let headers = new HttpHeaders({
            'Authorization': String(localStorage.getItem('token'))
        });
        
        return this.http.get('http://127.0.0.1:8000/dashboard-student', {
        headers:headers
        }).pipe(
            catchError(error => {
            throw new Error(error);
            })
        );
    }
}