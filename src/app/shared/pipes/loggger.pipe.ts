import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loggger',
})
export class LogggerPipe implements PipeTransform {
  transform(value: any): any {
    console.log(value);
    return value;
  }
}
