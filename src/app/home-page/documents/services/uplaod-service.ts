import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class UploadService{
  
    constructor(
        private http: HttpClient
    ) { }
  
    public upload = (file:any, fileStatus:string) =>{
        let formData: any = new FormData();
        formData.append("file", file);
        formData.append("form_type", fileStatus);

        let headers = new HttpHeaders({
            'Authorization': String(localStorage.getItem('token'))
        });
        
        return this.http.post('http://127.0.0.1:8000/upload', formData, { headers }).pipe(
         catchError(error => {
           throw new Error(error);
         })
        ).pipe();
    }

    public getUploadStatus = () => {

        let headers = new HttpHeaders({
            'Authorization': String(localStorage.getItem('token'))
        });
        
        return this.http.get('http://127.0.0.1:8000/upload', { headers }).pipe(
         catchError(error => {
           throw new Error(error);
         })
        ).pipe();
    }
  
}  