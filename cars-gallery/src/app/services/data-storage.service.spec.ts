import { DataStorageService } from './data-storage.service';
import { carMockData } from './../mock/carMockData';
import { TestBed } from '@angular/core/testing';
import { Car } from 'src/app/models/car.model';

describe('DataStorageService', () => {
  let dataStorageService: DataStorageService;
  let cars: Car[] = carMockData;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataStorageService] });
    dataStorageService = TestBed.inject(DataStorageService);
    // service = new DataStorageService(); without TestBed
  });

  it('#getCars should return cars', () => {
    expect(dataStorageService.getCars()).toEqual(cars);
  });

  it('#getObservableCars should return cars from observable', (done: DoneFn) => {
    dataStorageService.getObservableCars().subscribe((cars) => {
      expect(cars).toBe(cars);
      done();
      // done to inform Jasmine that Async function did complete and now
      // it is safe to continue to the next it()
    });
  });

  it('#getPromiseCars should return cars form a promise', (done: DoneFn) => {
    dataStorageService.getPromiseCars().then((cars) => {
      expect(cars).toBe(cars);
      done();
    });
  });
});
