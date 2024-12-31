import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
  
      LoginComponent,
     
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule ,// <-- Add this
       RouterModule.forChild([
              { path: '', component:  LoginComponent},
            
            ]),
    ],
    providers: [],
    bootstrap: [LoginComponent]
  })
  export class LoginModule { }
  