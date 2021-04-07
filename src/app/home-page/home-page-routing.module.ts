import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home-component/home-component.component';
import { HpholderComponent } from './hpholder/hpholder.component';
import { SignComponent } from './sign/sign.component';

export const routes:Routes = [
    { path: '', component: HomeComponent, children: [
      { path: 'home', component: HpholderComponent },
      { path: 'sign', component: SignComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'documents', component: DocumentsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageRoutingModule {
}