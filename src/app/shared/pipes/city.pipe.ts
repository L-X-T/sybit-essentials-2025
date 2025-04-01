import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
})
export class CityPipe implements PipeTransform {
  // private static counter = 0;

  transform(value: string, format?: string): string {
    // console.warn('[CityPipe -> transform] called #' + ++CityPipe.counter);
    
    let short, long;

    switch (value) {
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof';
        break;

      case 'Hamburg':
        short = 'HAM';
        long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
        break;

      case 'Wien':
        short = 'VIE';
        long = 'Flughafen Wien Schwechat';
        break;

      default:
        short = long = value;
    }

    if (format === 'short') {
      return short;
    }

    return long;
  }
}
