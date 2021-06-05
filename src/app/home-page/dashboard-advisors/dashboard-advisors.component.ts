import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { AdvisorsDashboardService } from './services/advisors-dashboard.service';

@Component({
  selector: 'app-dashboard-advisors',
  templateUrl: './dashboard-advisors.component.html',
  styleUrls: ['./dashboard-advisors.component.css']
})
export class DashboardAdvisorsComponent implements OnInit {

  constructor(private advisorsService:AdvisorsDashboardService) { }

  user_email!:string;
  prop_num!:number;

  ngOnInit(): void {
    this.user_email = jwt_decode<any>(localStorage.getItem('token')!).email;

    this.advisorsService.getAdvisorsDashboard().subscribe((proposals:any) => this.prop_num = proposals.prop_num);
  }

}
