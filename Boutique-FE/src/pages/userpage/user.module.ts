import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';




@NgModule({
  declarations: [

    AddUserComponent,ListUserComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    
    AppRoutingModule,
    FormsModule,
    SignUpModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ListUserComponent },
      {path:'adduser',component:AddUserComponent}

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class userModule { }
