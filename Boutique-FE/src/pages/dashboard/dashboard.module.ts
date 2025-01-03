import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [

    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    
    AppRoutingModule,
    FormsModule,
    SignUpModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
