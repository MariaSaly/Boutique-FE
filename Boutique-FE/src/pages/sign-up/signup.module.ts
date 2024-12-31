import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { SignUpComponent } from './sign-up.component';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations: [
  
        SignUpComponent,
     
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule, // <-- Add this,
      RouterModule.forChild([
        { path: '', component:  SignUpComponent},
      
      ]),
    ],
    providers: [],
    bootstrap: [SignUpComponent]
 
  })
  export class LoginModule { }
  