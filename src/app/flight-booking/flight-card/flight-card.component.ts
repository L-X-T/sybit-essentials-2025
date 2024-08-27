import { Component, input, model, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Flight } from '../../entities/flight';
import { FlightStatusToggleComponent } from '../flight-status-toggle/flight-status-toggle.component';

@Component({
  imports: [DatePipe, FlightStatusToggleComponent],
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
  readonly selected = model(false);

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

  protected onSelect(): void {
    // this.selected = true;
    this.debugInputs('onSelect');
    this.selected.set(true);
  }

  protected onDeselect(): void {
    // this.selected = false;
    this.debugInputs('onDeselect');
    this.selected.set(false);
  }

  private debugInputs(method: string): void {
    if (this.debug) {
      console.debug('[FlightCardComponent - ' + method + '()]');
      console.debug('flight', this.item);
      console.debug('selected', this.selected);
    }
  }
}
