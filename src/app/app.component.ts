import { Component } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AirportsComponent } from './airports/airports.component';

@Component({
  imports: [SidebarComponent, NavbarComponent, AirportsComponent],
  selector: 'app-flight-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  protected readonly title = 'Hello World!';

  constructor() {
    console.warn('AppComponent initialized');
    console.log(`Title: ${this.title}`);
  }
}
