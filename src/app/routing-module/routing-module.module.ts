import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home-page/home-component/home-component.component';
import { SignComponent } from '../home-page/sign/sign.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'sign', component: SignComponent},
  { path: '', redirectTo:'/home', pathMatch: 'full'},
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
