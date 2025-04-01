import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  pairwise,
  share,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Flight } from '../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-lookahead',
  imports: [ReactiveFormsModule, DatePipe, AsyncPipe],
  templateUrl: './flight-lookahead.component.html',
  styleUrl: './flight-lookahead.component.css',
})
export class FlightLookaheadComponent {
  private readonly http = inject(HttpClient);

  protected readonly control = new FormControl<string>('', { nonNullable: true }); // typed FormControl, since NG 14
  protected isLoading = false;
  protected readonly flights$: Observable<Flight[]>;
  protected readonly sizeDifference$: Observable<number>;
  protected readonly online$: Observable<boolean>;

  constructor() {
    const input$ = this.control.valueChanges.pipe(
      filter((input) => input.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
    );

    this.online$ = interval(2_000).pipe(
      startWith(0),
      map((_) => Math.random() > 0.5),
      distinctUntilChanged(),
      share(),
    );

    this.flights$ = combineLatest([input$, this.online$]).pipe(
      filter(([, online]: [string, boolean]) => online),
      map(([input]) => input),
      distinctUntilChanged(),
      tap((input) => (this.isLoading = true)),
      switchMap((input) => this.load(input)),
      tap((v) => (this.isLoading = false)),
      share(),
    );

    this.sizeDifference$ = this.flights$.pipe(
      startWith([]),
      pairwise(),
      map(([a, b]) => b.length - a.length),
    );

    this.flights$.pipe(takeUntilDestroyed()).subscribe((flights) => {
      console.log('Flights:', flights);
    });
  }

  private load(fromAirport: string): Observable<Flight[]> {
    const url = 'https://demo.angulararchitects.io/api/Flight';
    const params = new HttpParams().set('from', fromAirport);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers }).pipe(delay(1_000));
  }
}
