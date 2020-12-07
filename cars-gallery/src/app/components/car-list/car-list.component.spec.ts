import { DataStorageService } from './../../services/data-storage.service';
import { ActivateRouteStub } from './../../testing/activated-route-stub';
import { asyncData } from 'src/app/testing/async.observable';
import { ApiService } from './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarListComponent } from './car-list.component';
import { HttpClientModule } from '@angular/common/http';
import { carMockData } from 'src/app/mock/carMockData';
import { Car } from './../../models/car.model';
import { DebugElement } from '@angular/core';

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;
  let dataStorageServiceSpy: DataStorageServiceSpy;
  let expectedCar: Car;
  let router: Router;
  let activatedRoute: ActivateRouteStub = new ActivateRouteStub();
  let debugElement: DebugElement;
  let apiServiceSpy: { fetchCars: jasmine.Spy };
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let pipe: FilterPipe;

  beforeEach(fakeAsync(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['fetchCars']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    expectedCar = carMockData[0];
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CarListComponent, FilterPipe],
      providers: [
        { provide: DataStorageService, useValue: dataStorageServiceSpy },
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        DataStorageServiceSpy,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dataStorageServiceSpy = debugElement.injector.get(DataStorageServiceSpy);
    pipe = new FilterPipe();
  }));

  it('should create app', () => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should show the car which has a name equal to the filter string', () => {
    pipe = new FilterPipe();
    let carsResult: Car[] = [];
    carsResult.push(carMockData[1]);
    expect(pipe.transform(carMockData, 'R')).toEqual(carsResult);
  });

  it('should should have cars after ngOnInit from with ApiService and DataStorageService', fakeAsync(() => {
    let cars: Car[];
    cars = dataStorageServiceSpy.getCars();
    apiServiceSpy.fetchCars.and.returnValue(
      asyncData(carMockData).subscribe((apiResponse) => {
        dataStorageServiceSpy.setCars(apiResponse);
      })
    );
    tick();
    cars = dataStorageServiceSpy.cars;
    component.cars = cars;
    expect(component.cars).toBe(carMockData);
  }));

  it('should tell the ROUTER to navigate when (New Car) Button is clicked', fakeAsync(() => {
    spyOn(component, 'onAddCar');
    let onAddCar = fixture.debugElement.nativeElement.querySelector('button');
    onAddCar.click();
    tick();
    expect(component.onAddCar).toHaveBeenCalled();
    router = TestBed.inject(Router);
    router.navigate(['new']);
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['new'], 'should navigate to CarEditComponent ');
  }));
});

class DataStorageServiceSpy {
  cars: Car[] = [];

  getCars() {
    return this.cars;
  }

  setCars(cars: Car[]) {
    this.cars = cars;
  }
}
