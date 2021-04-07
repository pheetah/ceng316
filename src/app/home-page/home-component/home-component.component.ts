import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DocumentsComponent } from '../documents/documents.component';
import { SignComponent } from '../sign/sign.component';


@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent {
  routes = [
    { path: '', component: HomeComponent, children: [
      { path: 'home', component: HomeComponent, label:'home' },
      { path: 'sign', component: SignComponent, label:'sign' },
      { path: 'dashboard', component: DashboardComponent, label:'dashboard' },
      { path: 'documents', component: DocumentsComponent, label:'documents' }
    ]
  }
];

  ngOnInit(){
    console.log(this.routes);
  }
}
