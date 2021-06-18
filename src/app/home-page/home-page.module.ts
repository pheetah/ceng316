import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-component/home-component.component';
import { SignComponent } from './sign/sign.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';
import { DialogContentExample, HpholderComponent } from './students/hpholder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './sign/guard/auth-guard';
import { AdvisorsComponent, AdvisorsDialog } from './advisors/advisors.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './sign/state-mgmt/auth-effects';
import { PrerequisitesComponent } from './prerequisites/prerequisites.component';
import { DashboardAdvisorsComponent } from './dashboard-advisors/dashboard-advisors.component';
import { StudentsResolver } from './students/state-mgmt/students-resolver';
import { StudentsEffects } from './students/state-mgmt/students-effects';

@NgModule({
  declarations: [
    HomeComponent, 
    SignComponent, 
    HpholderComponent, 
    DashboardComponent, 
    DocumentsComponent,
    DialogContentExample,
    AdvisorsComponent,
    AdvisorsDialog,
    PrerequisitesComponent,
    DashboardAdvisorsComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    StoreModule.forFeature("students", fromAuth.studentsReducer),
    EffectsModule.forFeature([AuthEffects,StudentsEffects]),
  ],
  providers:[CookieService, AuthGuard, StudentsResolver],
  exports:[HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomePageModule { }
