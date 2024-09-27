import { Route } from '@angular/router';

import { AirportsComponent } from './components/airports/airports.component';
import { HomeComponent } from './components/home/home.component';

import flightBookingRoutes from './flight-booking/flight-booking.routes';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'airports',
    title: 'Airports',
    component: AirportsComponent,
  },

  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },

  {
    path: 'flight-booking',
    title: 'Flight Booking',
    children: flightBookingRoutes,
  },

  /*{
    path: '**',
    redirectTo: '',
  },*/
];
