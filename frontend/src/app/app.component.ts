import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  imports: [HomeComponent, SidebarComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
