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


@NgModule({
  declarations: [
    HomeComponent, 
    SignComponent, 
    HpholderComponent, 
    DashboardComponent, 
    DocumentsComponent,
    DialogContentExample,
    AdvisorsComponent,
    AdvisorsDialog
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers:[CookieService, AuthGuard],
  exports:[HomeComponent],
  bootstrap: [HomeComponent]
})
export class HomePageModule { }
