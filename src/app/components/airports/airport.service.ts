import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// import { AirportNameFormat } from '../entities/airport-name-format';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private readonly url = 'https://demo.angulararchitects.io/api/Airport';

  private readonly httpClient = inject(HttpClient);

  findAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url).pipe(
      // Eliminate duplicates
      map((airports) => [...new Set(airports)]),
    );
  }

  /*getAirportName(name: string, format: AirportNameFormat): Observable<string> {
    let url = 'http://angular-at.azurewebsites.net/api/airport/';
    url += format === 'short' ? 'code' : 'fullName';

    const params = new HttpParams().set('name', name);

    return this.httpClient.get<string>(url, { params });
  }*/
}
