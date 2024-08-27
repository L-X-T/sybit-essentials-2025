import { Component, model } from '@angular/core';

@Component({
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css'],
})
export class FlightStatusToggleComponent {
  // @Input() delayed = false;
  // @Output() readonly delayedChange = new EventEmitter<boolean>();
  readonly delayed = model(false);

  protected onToggle(): void {
    this.delayed.update((delayed) => !delayed);
  }
}
