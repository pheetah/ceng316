import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-component/home-component.component';
import { SignComponent } from './sign/sign.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material-module';
import { RoutingModule } from '../routing-module/routing-module.module';


@NgModule({
  declarations: [HomeComponent, SignComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    RoutingModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  bootstrap: [HomeComponent]
})
export class HomePageModule { }
