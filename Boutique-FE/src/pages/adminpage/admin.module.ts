import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app/app.routes';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/authService';
import { CommonModule } from '@angular/common';
import { SignUpModule } from '../sign-up/signup.module';
import { AddItemsComponent } from './add-items/add-items.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AdminAuthGuard } from '../../app/admin-auth.guard';



@NgModule({
  declarations: [

   

  ],
  imports: [
    
    CommonModule,
    
    
    FormsModule,
    
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ListItemsComponent },
      {path:'add',component:AddItemsComponent},
      {path:':id/view' ,component:AddItemsComponent},
      {path:':id/edit' ,component:AddItemsComponent}

    ]),
  ],
  providers: [],
  bootstrap: []
})
export class adminModule { }
