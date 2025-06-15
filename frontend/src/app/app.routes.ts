import { Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { CreateTaskComponent } from './components/create-task.component';
import { ViewTaskComponent } from './components/view-task.component';
import { UpdateTaskComponent } from './components/update-task.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'view-task', component: ViewTaskComponent },
  { path: 'update-task/:id', component: UpdateTaskComponent },
  { path: '**', redirectTo: '' }
];