import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentProgress } from './services/current_progress.service';
import { StudentDashboardService } from './services/student-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentStep!:string;
  nextStep!:string;
  taskProgress!:number;

  constructor(
    private dashboardService: StudentDashboardService,
    private currentProgressService: CurrentProgress
  ){}

  ngOnInit(
  ){
    this.dashboardService.getStudentDashboard().subscribe((dashboard:any)=> {
      this.currentStep = dashboard.current_state;
      this.nextStep = dashboard.next_state;
      this.taskProgress = dashboard.progress_percentage;
      this.currentProgressService.currentProgress$.next(dashboard.current_state);
    });
  }

  displayedColumnsLectures = ['item'];
  displayedColumnsThesis = ['item', 'percentage'];
  
  transactions: Lectures[] = [
    {item: 'CENG 4XX'},
    {item: 'CENG 3XX'},
    {item: 'CENG 2XX'},
    {item: 'CENG 3XX'},
    {item: 'CENG 3XX'},
  ];

  tasks: Thesis[] = [
    {item: 'Thesis Defense Jury Appointment Form Submission', percentage: 50},
    {item: 'Thesis Defense Jury Appointment Form Submission', percentage: 90},
  ];

}

interface Lectures{
  item: string;
}

export interface Thesis {
  item: string;
  percentage: number;
}