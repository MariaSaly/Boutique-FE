import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutzzComponent } from './layoutzz/layoutzz.component';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
   
  ],
  exports: [],
  imports: [
    BrowserModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', // Default route for this module
        component: LayoutzzComponent,
      
      },
    ]),
  ],
  providers: [],
  bootstrap: [], // This module doesn't bootstrap any component
})
export class LayoutModule {}
