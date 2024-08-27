import { Component, inject, signal } from '@angular/core';
import { delay } from 'rxjs';
import { AirportService } from './airport.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
})
export class AirportsComponent {
  airports = signal<string[]>([]);

  constructor() {
    inject(AirportService)
      .findAll()
      .pipe(delay(1_000), takeUntilDestroyed())
      .subscribe((airports) => this.airports.set(airports));
  }
}
