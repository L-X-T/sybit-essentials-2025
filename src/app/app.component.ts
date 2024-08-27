import { Component } from '@angular/core';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';

@Component({
  imports: [SidebarComponent, NavbarComponent, FlightSearchComponent],
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
