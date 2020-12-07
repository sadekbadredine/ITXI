import { carMockData } from './../mock/carMockData';
import { Injectable } from '@angular/core';
import { Car } from './../models/car.model';
import { of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  carsChanged = new Subject<Car[]>();

  cars: Car[] = carMockData;

  constructor() {}

  setCars(cars: Car[]) {
    this.cars = cars;
    this.carsChanged.next(cars);
  }

  getCars() {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }

  addCar(newCar: Car) {
    this.cars.push(newCar);
  }

  updateCar(editedCar: Car, carId: number) {
    this.cars[carId] = editedCar;
  }

  deleteCar(carId: number) {
    this.cars.splice(carId, 1);
  }

  getObservableCars() {
    return of(this.cars);
  }

  getPromiseCars() {
    return Promise.resolve(this.cars);
  }
}
