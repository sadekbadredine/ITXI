import { DataStorageService } from './../../services/data-storage.service';
import { CarDetailComponent } from './car-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { carMockData } from 'src/app/mock/carMockData';
import { of } from 'rxjs';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let routerSpy: { navigate: jasmine.Spy };
  let dataStorageServiceSpy: any;
  let activatedRoute: any;
  let router: { navigate: jasmine.Spy };
  beforeEach(
    waitForAsync(() => {
      activatedRoute = {
        params: of({
          id: carMockData[0].id,
        }),
      };
      dataStorageServiceSpy = jasmine.createSpyObj('DataStorageService', [
        'getCar',
      ]);
      TestBed.configureTestingModule({
        declarations: [CarDetailComponent],
        providers: [
          { provide: DataStorageService, useValue: dataStorageServiceSpy },
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(CarDetailComponent);
          component = fixture.componentInstance;
          let car = dataStorageServiceSpy.getCar.and.returnValue(
            carMockData[0]
          );
          component.car = car;
          fixture.detectChanges();
        });
    })
  );
  function getElement(element: string) {
    return fixture.debugElement.nativeElement.querySelector(element);
  }

  it('should show the image of the car', () => {
    let imgElement = getElement('img');
    expect(imgElement.src).toEqual(carMockData[0].imagePath);
  });

  it('should show the name of the car', () => {
    let nameElement = getElement('h1');
    expect(nameElement.textContent).toEqual(carMockData[0].name);
  });

  it('should show the production year of the car', () => {
    let yearElement = getElement('#year');
    expect(yearElement.textContent).toContain(carMockData[0].year);
  });

  it('should show the color of the car', () => {
    let colorElement = getElement('#color');
    expect(colorElement.textContent).toContain(carMockData[0].color);
  });

  it('should show the horse power of the car', () => {
    let horsePowerElement = getElement('#horsePower');
    expect(horsePowerElement.textContent).toContain(carMockData[0].horsePower);
  });

  it('should show the engine cylinder of the car', () => {
    let cylinderElement = getElement('#cylinder');
    expect(cylinderElement.textContent).toContain(carMockData[0].cylinder);
  });

  it('should navigate to CarEditComponent if user clicks on edit dropdown list', fakeAsync(() => {
    router = jasmine.createSpyObj('router', ['navigate']);
    router.navigate.and.returnValue(['/edit']);
    let onEdit = getElement('#editCar');
    onEdit.click();
    tick();
    expect(router.navigate()).toEqual(['/edit']);
  }));

  it('should delete selected car from the car list', fakeAsync(() => {
    spyOn(component, 'onDeleteCar');
    let onDelete = getElement('#deleteCar');
    onDelete.click();
    tick();
    expect(component.onDeleteCar).toHaveBeenCalled();
  }));
});
