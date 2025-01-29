import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp,initializeApp} from "@angular/fire/app";
import { getAuth,provideAuth} from "@angular/fire/auth";
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { environment } from '../environment';
import { HttpService } from '../service/httpService';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(()=> getAuth()),
    provideToastr({
      timeOut: 3000, // Toast duration in milliseconds
      positionClass: 'toast-top-right', // Position of the toast
      preventDuplicates: true // Prevent duplicate toasts
    }),
    
    HttpService,
    importProvidersFrom(HttpClientModule), 
    provideAnimationsAsync()
  ]
};
