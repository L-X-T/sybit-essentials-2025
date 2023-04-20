import { Component, DestroyRef, effect, inject, model } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { Flight } from '../../entities/flight';
import { FlightService } from '../shared/services/flight.service';
import { FlightValidationErrorsComponent } from '../flight-validation-errors/flight-validation-errors.component';
import { validateCity } from '../shared/validation/city-validator';
import { validateAsyncCity } from '../shared/validation/async-city-validator';
import { validateRoundTrip } from '../shared/validation/round-trip-validator';
import { CITY_PATTERN } from '../../shared/global';

@Component({
  standalone: true,
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css'],
  imports: [ReactiveFormsModule, FlightValidationErrorsComponent],
})
export class FlightEditComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  readonly flight = model<Flight | null>(null);

  protected debug = true;
  protected id = '';
  protected showDetails = '';

  protected editForm = this.fb.group(
    {
      id: [0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]],
      from: [
        '',
        {
          asyncValidators: [validateAsyncCity(this.flightService)],
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern(CITY_PATTERN),
            validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin']),
          ],
          updateOn: 'blur',
        },
      ],
      to: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(CITY_PATTERN),
          validateCity(['Graz', 'Wien', 'Hamburg', 'Berlin']),
        ],
      ],
      date: ['', [Validators.required, Validators.minLength(33), Validators.maxLength(33)]],
    },
    {
      validators: validateRoundTrip,
    },
  );

  protected message = '';

  private readonly valueChangesLogger = this.editForm.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged((a, b) => a.id === b.id && a.from === b.from && a.to === b.to && a.date === b.date),
      takeUntilDestroyed(),
    )
    .subscribe((value) => {
      console.log(value);
    });

  private readonly paramsSubscription = this.route.params.subscribe((params) => this.onRouteParams(params));

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
        if (this.debug) {
          console.log('saved flight:', flight);
        }
        this.flight.set(flight);
        this.message = 'Success saving!';
        this.patchFormValue();
      },
      error: (err: HttpErrorResponse) => {
        if (this.debug) {
          console.error('save error:', err);
        }
        this.message = 'Error saving!';
      },
    });
  }

  private patchFormValue(): void {
    if (this.editForm && this.flight()) {
      this.editForm.patchValue(this.flight() as Flight);
    }
  }

  private onRouteParams(params: Params) {
    this.id = params['id'];
    this.showDetails = params['showDetails'];

    this.flightService
      .findById(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (flight) => {
          this.flight.set(flight);
          this.message = 'Success loading!';
          this.patchFormValue();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error', err);
          this.message = 'Error Loading!';
        },
      });
  }
}
