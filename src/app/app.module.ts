import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material-module';
import { HomePageModule } from './home-page/home-page.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFileUploaderModule
  ],
  exports:[MaterialModule],
  providers: [CookieService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
