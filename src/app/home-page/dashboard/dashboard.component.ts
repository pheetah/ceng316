import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(){}

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