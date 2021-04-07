import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-component/home-component.component';
import { SignComponent } from './sign/sign.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';
import { HpholderComponent } from './hpholder/hpholder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';


@NgModule({
  declarations: [HomeComponent, SignComponent, HpholderComponent, DashboardComponent, DocumentsComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ],
  exports:[HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomePageModule { }
