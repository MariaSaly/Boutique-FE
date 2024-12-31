import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Make sure this is imported

import { AppComponent } from './app.component';
import { AngularFireModule} from '@angular/fire/compat'


import { LoginComponent } from '../pages/login/login.component';
import { environment } from '../environment';
import { AppRoutingModule } from './app.routes';
import { AngularFireAuthModule} from '@angular/fire/compat/auth'


const firebaseConfig ={
  apiKey: "AIzaSyAF0eMfM7RFirRaP7CoTCQa7LmrLrPLI8k",
  authDomain: "mokshedestination-boutique.firebaseapp.com",
  projectId: "mokshedestination-boutique",
  storageBucket: "mokshedestination-boutique.firebasestorage.app",
  messagingSenderId: "520959613605",
  appId: "1:520959613605:web:23b352de0dcb53b39c0b4c",
  measurementId: "G-ELDR785DMQ"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
     AngularFireAuthModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
