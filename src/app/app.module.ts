import { ApplicationConfig } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),   // Provide HttpClient globally
    CommonModule,          // Provide CommonModule
    NzButtonModule,        // Include other modules if needed
    NzTableModule,
    NzIconModule,
  ]
};
