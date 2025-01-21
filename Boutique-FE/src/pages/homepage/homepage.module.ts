import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';

import { HomepageComponent } from './homepage.component';
import { dashboardModule } from '../dashboard/dashboard.module';


@NgModule({
  declarations: [

    HomepageComponent,

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
      { path: '', component: HomepageComponent },

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class homeModule { }
