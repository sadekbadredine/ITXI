import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettify',
})
export class PrettifyPipe implements PipeTransform {
  transform(value: string): string {
    value = value[0].toUpperCase() + value.substr(1, value.length);
    return value.replace('-', ' ');
  }
}
