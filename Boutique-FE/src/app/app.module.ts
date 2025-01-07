import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component';
import { environment } from '../environment';
import { AppRoutingModule } from './app.routes';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import  { provideFirebaseApp,getApp,initializeApp} from "@angular/fire/app"
import { getFirestore,provideFirestore} from "@angular/fire/firestore"

// Firebase Authentication and Firestore Services
import { AuthService } from '../shared/authService';
import { LoginModule } from '../pages/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../service/httpInterceptorService';
import { LayoutModule } from '../layout/layout.module';
import { LayoutzzComponent } from '../layout/layoutzz/layoutzz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutzzComponent
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AppRoutingModule,
    
    // Initialize Firebase with the provided config
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS ,useClass:AuthInterceptor,multi:true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
