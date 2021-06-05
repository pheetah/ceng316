import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }
  
  public download = (id:number) =>{

    let headers = new HttpHeaders({
        'Authorization': String(localStorage.getItem('token'))
    });
    
    return this.http.get('http://127.0.0.1:8000/download/' + `${id}`, {
        headers : headers,
        responseType: 'blob'
    })
    .pipe(

    //   catchError(error => {
    //     throw new Error(error);
    //   })
    );

  }

}