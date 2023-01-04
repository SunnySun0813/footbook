import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pastTime'
})
export class PastTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): Date {
    return new Date(value);
  }

}
