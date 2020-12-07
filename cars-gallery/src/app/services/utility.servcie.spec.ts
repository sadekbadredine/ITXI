import { DataStorageService } from './data-storage.service';
import { UtilityService } from './utility.service';
import { carMockData } from '../mock/carMockData';
import { TestBed } from '@angular/core/testing';
import { Car } from 'src/app/models/car.model';

export class FakeDataStorageService extends DataStorageService {
  cars: Car[] = carMockData;
}

export class Bird {
  sound: string;

  constructor() {
    this.getSound = function () {
      return 'Chirp';
    };
  }

  getSound() {
    return this.sound;
  }
}
////////////////////////////SPY EXAMPLES/////////////////////////
describe('Testing Bird with fake getSound() method', () => {
  let bird = new Bird();

  it('calls the fake getSound() method created by createSpy', () => {
    bird.getSound = jasmine.createSpy();
    bird.getSound(); // this getSound original function
    expect(bird.getSound).toHaveBeenCalled();
    // bird.getSound is the spy function
  });

  it('calls the fake getSound() created by createSpy() with return value', () => {
    bird.getSound = jasmine.createSpy().and.callFake(() => {
      return 'hoot';
    });
    expect(bird.getSound()).toEqual('hoot');
  });
});

describe('Multiple spies created with createSpyObj()', () => {
  let ball;
  beforeEach(() => {
    ball = jasmine.createSpyObj(['roll', 'bounce', 'stop']);
    ball.roll();
    ball.bounce(4);
    ball.stop();
  });

  it('should create multiple spy methods', () => {
    expect(ball.roll).toBeDefined();
    expect(ball.bounce).toBeDefined();
    expect(ball.stop).toBeDefined();
  });

  it('should track the invoked spy methods', () => {
    expect(ball.roll).toHaveBeenCalled();
    expect(ball.bounce).toHaveBeenCalled();
    expect(ball.stop).toHaveBeenCalled();
  });
});
////////////////////////ANGULAR DOCUMENTATION////////////////////
describe('Utility Service without Angular Support', () => {
  let utilityService: UtilityService;
  let cars: Car[] = carMockData;

  beforeEach(() => {
    utilityService = new UtilityService(new DataStorageService());
  });

  it('#getCars should return cars from DataStorageService', () => {
    expect(utilityService.getCars()).toBe(cars);
  });

  it('#getCars should return faked cars from a FakeDataStorageService', () => {
    utilityService = new UtilityService(new FakeDataStorageService());
    expect(utilityService.getCars()).toBe(cars);
  });

  it('#getCars should return faked Cars from a fake object', () => {
    const fakeCars = { getCars: () => cars };
    utilityService = new UtilityService(fakeCars as FakeDataStorageService);
    expect(utilityService.getCars()).toBe(cars);
  });

  it('#getCars should return carMockData from a spy', () => {
    const dataStorageServiceSpy = jasmine.createSpyObj('DataStorageService', [
      'getCars',
    ]);
    dataStorageServiceSpy.getCars.and.returnValue(carMockData);

    utilityService = new UtilityService(dataStorageServiceSpy);
    expect(utilityService.getCars()).toBe(carMockData);
    expect(dataStorageServiceSpy.getCars.calls.count()).toBe(1);
    expect(dataStorageServiceSpy.getCars.calls.mostRecent().returnValue).toBe(
      carMockData
    );
  });
});

describe('Utility Service with TestBed', () => {
  let utilityService: UtilityService;
  let dataStorageServiceSpy: jasmine.SpyObj<DataStorageService>;
  let cars: Car[] = carMockData;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataStorageService', ['getCars']);
    TestBed.configureTestingModule({
      providers: [
        UtilityService,
        { provide: DataStorageService, useValue: spy },
      ],
    });
    utilityService = TestBed.inject(UtilityService);
    dataStorageServiceSpy = TestBed.inject(
      DataStorageService
    ) as jasmine.SpyObj<DataStorageService>;
  });

  it('#getCars should return carMockData from a spy', () => {
    dataStorageServiceSpy.getCars.and.returnValue(cars);
    expect(utilityService.getCars()).toBe(cars);
    expect(dataStorageServiceSpy.getCars.calls.count()).toBe(1);
    expect(dataStorageServiceSpy.getCars.calls.mostRecent().returnValue).toBe(
      cars
    );
  });
});

describe('Utility Service without beforeEach()', () => {
  function setup() {
    const dataStorageServiceSpy = jasmine.createSpyObj('DataStorageService', [
      'getCars',
    ]);
    const cars: Car[] = carMockData;
    const utilityService = new UtilityService(dataStorageServiceSpy);
    dataStorageServiceSpy.getCars.and.returnValue(cars);
    return { utilityService, cars, dataStorageServiceSpy };
  }

  it('#getCars should return carMockData from a spy', () => {
    const { utilityService, cars, dataStorageServiceSpy } = setup();
    expect(utilityService.getCars()).toBe(cars);
    expect(dataStorageServiceSpy.getCars.calls.count()).toBe(1);
    expect(dataStorageServiceSpy.getCars.calls.mostRecent().returnValue).toBe(
      cars
    );
  });
});
