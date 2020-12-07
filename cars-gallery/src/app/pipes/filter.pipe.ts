import { Car } from './../models/car.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<Car>, filterString: string): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    let resultArray = [];
    for (let item of value) {
      if (item.name.includes(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
