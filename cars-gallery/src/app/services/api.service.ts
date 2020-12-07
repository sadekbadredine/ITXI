import { DataStorageService } from './data-storage.service';
import { HttpClient } from '@angular/common/http';
import { Car } from './../models/car.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private dataStorageService: DataStorageService,
    private http: HttpClient
  ) {}

  storeCars(cars: Car[]) {
    return this.http.put(
      'https://cars-gallery-bd3e2.firebaseio.com/cars.json',
      cars
    );
  }

  fetchCars() {
    return this.http.get<Car[]>(
      'https://cars-gallery-bd3e2.firebaseio.com/cars.json'
    );
  }
}
