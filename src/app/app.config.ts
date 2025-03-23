import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCapr7mkKt1N5Y-dRhf1GUpO7Mze-ZCrwI",
      authDomain: "simple-crm-92145.firebaseapp.com",
      projectId: "simple-crm-92145",
      storageBucket: "simple-crm-92145.firebasestorage.app",
      messagingSenderId: "203910201150",
      appId: "1:203910201150:web:26eae1c8c599e2290af66f"
    })), provideFirestore(() => getFirestore())
  ]
};
