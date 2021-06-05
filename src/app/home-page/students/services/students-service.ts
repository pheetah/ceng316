import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
export class StudentsService {
  
  constructor(private http: HttpClient) { }
  
  public getStudents = () =>{

    let headers = new HttpHeaders({
        'Authorization': String(localStorage.getItem('token'))
    });
    
    return this.http.get('http://127.0.0.1:8000/students', {
    headers:headers
    }).pipe(
      catchError(error => {
        throw new Error(error);
      })
    );
  }

  public postStudents = (email:string, status:boolean) =>{

    let headers = new HttpHeaders({
        'Authorization': String(localStorage.getItem('token'))
    });
    
    return this.http.post('http://127.0.0.1:8000/students', {email: email, status: status}, {
    headers:headers
    }).pipe(
      catchError(error => {
        throw new Error(error);
      })
    );
  }

  public mockStudents(){
      const response = {
          "students": [
              {
                "student_name": "eric lamela",
                "branch": "software testing",
                "department": "computer engineering",
                "state": "accepted",
                "email": "ericlamela@std.iyte.edu.tr"
              },
              {
                  "student_name": "john doe",
                  "branch": "computer vision",
                  "department": "computer engineering",
                  "state": "pending",
                  "email": "johndoe@std.iyte.edu.tr"
              },
              {
                  "student_name": "kemal kılıcdaorluı",
                  "branch": "computer vision",
                  "department": "computer engineering",
                  "state": "pending",
                  "email": "cilicdaroglu@std.iyte.edu.tr"
              },
              {
                "student_name": "fenerbahceli cemil",
                "branch": "software testing",
                "department": "computer engineering",
                "state": "accepted",
                "email": "fenerbahcelicemil@std.iyte.edu.tr"
              },
              {
                "student_name": "lionel messi",
                "branch": "software testing",
                "department": "computer engineering",
                "state": "accepted",
                "email": "lionelmessi@std.iyte.edu.tr"
              },
              {
                "student_name": "ahmet mehmet",
                "branch": "computer vision",
                "department": "computer engineering",
                "state": "pending",
                "email": "ahmetmehmet@std.iyte.edu.tr"
            },
            {
              "student_name": "ogrenci iyte",
              "branch": "computer vision",
              "department": "computer engineering",
              "state": "pending",
              "email": "ogrenciiyte@std.iyte.edu.tr"
            },
            {
              "student_name": "Memati Bas",
              "branch": "computer vision",
              "department": "computer engineering",
              "state": "accepted",
              "email": "mematibas@std.iyte.edu.tr"
            },
          ]
        }
      ;
  
      let obs = new Observable((subscriber) => {
          setTimeout(()=>{
              subscriber.next(response);
              subscriber.complete();
          }, 100);
      }).pipe();
      return obs;
  }
  
}  