import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp,initializeApp} from "@angular/fire/app";
import { getAuth,provideAuth} from "@angular/fire/auth"

import { routes } from './app.routes';
import { environment } from '../environment';
import { HttpService } from '../service/httpService';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(()=> getAuth()),
    HttpService,
    importProvidersFrom(HttpClientModule)
  ]
};
