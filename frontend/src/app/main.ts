import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Assuming you might use routing
import { provideHttpClient } from '@angular/common/http'; // <-- Import this

//import { routes } from './app/components/app.routes'; // Assuming you have an app.routes.ts for routing

export const appConfig: ApplicationConfig = {
  providers: [
    //provideRouter(routes), // Keep this if you have routing configured
    provideHttpClient() // <-- Add this to provide HttpClient
  ]
};