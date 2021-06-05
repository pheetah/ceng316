import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-dashboard-advisors',
  templateUrl: './dashboard-advisors.component.html',
  styleUrls: ['./dashboard-advisors.component.css']
})
export class DashboardAdvisorsComponent implements OnInit {

  constructor() { }

  user_email!:string;

  ngOnInit(): void {
    this.user_email = jwt_decode<any>(localStorage.getItem('token')!).email;
  }

}
