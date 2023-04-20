import { Component, DestroyRef, effect, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css'],
  imports: [ReactiveFormsModule],
})
export class FlightEditComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);
  private readonly fb = inject(FormBuilder);

  readonly flight = input<Flight | null>(null);

  protected editForm = this.fb.group({
    id: [0],
    from: [''],
    to: [''],
    date: [''],
  });

  protected message = '';

  private readonly valueChangesLogger = this.editForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
    console.log(value);
  });

  constructor() {
    effect(() => {
      const flight = this.flight();
      if (flight) {
        this.editForm.patchValue(flight as Flight);
      }
    });
  }

  protected onSave(): void {
    this.flightService.save(this.editForm.value as Flight).subscribe({
      next: (flight) => {
        this.message = 'Success!';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error', err);
        this.message = 'Error!';
      },
    });
  }
}
