import { Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { CreateTaskComponent } from './components/create-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: '**', redirectTo: '' }
];