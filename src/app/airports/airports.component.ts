import { Component, inject } from '@angular/core';
import { delay } from 'rxjs';
import { AirportService } from './airport.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  imports: [AsyncPipe],
})
export class AirportsComponent {
  protected readonly airports$ = inject(AirportService).findAll().pipe(delay(1_000));
}
