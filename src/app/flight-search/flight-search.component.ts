import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Flight } from '../entities/flight';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { FlightService } from './flight.service';
import { CityPipe } from '../shared/pipes/city.pipe';

@Component({
  imports: [CommonModule, FormsModule, CityPipe],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css',
})
export class FlightSearchComponent {
  protected from = 'Hamburg';
  protected to = 'Graz';
  protected flights: Flight[] = [];
  protected selectedFlight?: Flight;

  protected message = '';

  // private getDateCounter = 0;

  // constructor(private readonly flightService: FlightService) {}
  private readonly flightService = inject(FlightService);

  protected onSearch(): void {
    this.flightService.find(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp: HttpErrorResponse) => {
        console.error('Error loading flights', errResp);
      },
      complete: () => {
        console.debug('Flights loading completed.');
      },
    });
  }

  protected onSelect(selectedFlight: Flight): void {
    this.selectedFlight = selectedFlight;
  }

  protected onSave(): void {
    if (this.selectedFlight) {
      this.flightService.save(this.selectedFlight).subscribe({
        next: (flight) => {
          console.log('Flight saved: ', flight);
          this.selectedFlight = flight;
          this.message = 'Success!';
        },
        error: (errResponse: HttpErrorResponse) => {
          console.error('Error saving flight', errResponse);
          this.message = 'Error: ' + errResponse.message;
        },
      });
    }
  }

  protected getDate(flight: Flight): string {
    // console.warn('[FSC -> getDate] called #' + ++this.getDateCounter);

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(new Date(flight.date), 'dd.MM.yyyy HH:mm') || '';
  }
}
