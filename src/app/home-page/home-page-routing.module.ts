import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { HomeComponent } from './home-component/home-component.component';
import { HpholderComponent } from './students/hpholder.component';
import { AuthGuard } from './sign/guard/auth-guard';
import { SignComponent } from './sign/sign.component';

export const routes:Routes = [
    { path: '', component: HomeComponent, children: [
      { path: 'students', component: HpholderComponent, canActivate: [AuthGuard]},
      { path: 'sign', component: SignComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
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