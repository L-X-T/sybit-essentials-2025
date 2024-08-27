import { Component, input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Flight } from '../../entities/flight';

@Component({
  imports: [DatePipe],
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  private debug = false;

  // @Input({required: true}) item!: Flight;
  readonly item = input.required<Flight>();
  // @Input() selected = false;
  // @Output() readonly selectedChange = new EventEmitter<boolean>();
  readonly selected = input(false);

  constructor() {
    this.debugInputs('constructor');
  }

  ngOnChanges(): void {
    this.debugInputs('ngOnChanges');
  }

  ngOnInit(): void {
    this.debugInputs('ngOnInit');
  }

  ngOnDestroy(): void {
    this.debugInputs('ngOnDestroy');
  }

  private debugInputs(method: string): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ' + method + '()]');
      console.debug('flight', this.item);
      console.debug('selected', this.selected);
    }
  }
}
