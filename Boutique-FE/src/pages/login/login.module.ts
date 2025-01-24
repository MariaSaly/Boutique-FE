import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';
import { SharedModule } from '../../app/shared.module';


@NgModule({
  declarations: [

  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    SignUpModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
