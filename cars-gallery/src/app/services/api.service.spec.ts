import { asyncData, asyncError } from '../testing/async.observable';
import { DataStorageService } from './data-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { carMockData } from './../mock/carMockData';
import { Car } from './../models/car.model';
import { ApiService } from './api.service';

describe('Testing Api Service', () => {
  let httpClientSpy: { get: jasmine.Spy; put: jasmine.Spy };
  let apiService: ApiService;
  let dataStorageService: DataStorageService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    apiService = new ApiService(dataStorageService, httpClientSpy as any);
  });
  /////////////////////////// TESTING GET REQUEST //////////////////////////////////
  it('#fetchCars should return expected cars (HttpClient called once)', () => {
    const expectedCars: Car[] = carMockData;
    httpClientSpy.get.and.returnValue(asyncData(expectedCars));

    apiService.fetchCars().subscribe((cars) => {
      expect(cars).toEqual(expectedCars);
    }, fail);
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should return and error when the server returns 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    apiService.fetchCars().subscribe(
      (cars) => {
        fail('expected an error, not cars');
      },
      (error) => expect(errorResponse.error).toContain('test 404 error')
    );
  });
  /////////////////////////// TESTING PUT REQUEST //////////////////////////////////
  it('#storeCars should return cars to be sent', () => {
    const expectedCarsToBeSent: Car[] = carMockData;
    httpClientSpy.put.and.returnValue(asyncData(expectedCarsToBeSent));

    apiService.storeCars(expectedCarsToBeSent).subscribe((cars) => {
      expect(cars).toEqual(expectedCarsToBeSent);
    }, fail);
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });

  it('should return and error when the server returns 404', () => {
    const expectedCarsToBeSent: Car[] = carMockData;

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    httpClientSpy.put.and.returnValue(asyncError(errorResponse));

    apiService.storeCars(expectedCarsToBeSent).subscribe(
      (cars) => {
        fail('expected an error, not cars');
      },
      (error) => expect(errorResponse.error).toContain('test 404 error')
    );
  });
});
