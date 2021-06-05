import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { PrerequisitesResponse } from '../prerequisites.component';

@Injectable({
  providedIn: 'root'
})
export class PrerequisitesService {

  constructor(private http: HttpClient) { }
  
  public getPrerequisites = (student_email:string) =>{

    let headers = new HttpHeaders({
        'Authorization': String(localStorage.getItem('token'))
    });
    
    return this.http.post<PrerequisitesResponse>('http://127.0.0.1:8000/prerequisites',  {email : student_email},
    {
      headers : headers,
    }).pipe(
      catchError(error => {
        throw new Error(error);
      })
    );

  }

}