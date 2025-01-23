import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';


import { dashboardModule } from '../dashboard/dashboard.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [

    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    dashboardModule,
    AppRoutingModule,
    FormsModule,
    SignUpModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent },

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class profileModule { }
