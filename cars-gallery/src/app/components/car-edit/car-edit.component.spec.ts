import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivateRouteStub } from 'src/app/testing/activated-route-stub';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarEditComponent } from './car-edit.component';
import { Car } from 'src/app/models/car.model';
import {
  carMockData,
  carMockEditedData,
  carMockEmptyData,
  carMockNewData,
} from './../../mock/carMockData';

describe('CarEditComponent', () => {
  let fixture: ComponentFixture<CarEditComponent>;
  let activatedRoute: ActivateRouteStub;
  let component: CarEditComponent;
  let debugElement: DebugElement;
  let editMode: boolean;
  let expectedCar: Car;
  let router: { navigate: jasmine.Spy };
  let serviceSpy: DataStorageServiceSpy;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CarEditComponent],
        providers: [
          { provide: DataStorageService, useValue: serviceSpy },
          { provide: Router, useValue: router },
          { provide: ActivatedRoute, useValue: activatedRoute },
          DataStorageServiceSpy,
        ],
        schemas: [NO_ERRORS_SCHEMA],
      });

      expectedCar = carMockData[0];
      fixture = TestBed.createComponent(CarEditComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      serviceSpy = debugElement.injector.get(DataStorageServiceSpy);
      router = jasmine.createSpyObj('router', ['navigate']);
      editMode = true;
    })
  );

  it('should fill the form with with data of the car that has and id equals to route params', () => {
    let params = getParams(activatedRoute, expectedCar);
    expect(params).toBeDefined();
    let form = setUpForm(component.carForm, carMockData[params]);
    expect(form.status).toBe('VALID');
  });

  it('should show an empty form if route is [/new]', () => {
    router.navigate.and.returnValue(['new']);
    router.navigate();
    expect(router.navigate.calls.count()).toBe(1);
    expect(router.navigate()).toEqual(['new']);
    let form = setUpForm(component.carForm, carMockEmptyData[0]);
    expect(form.status).toBe('INVALID');
  });

  it('should navigate one level up when onCancel function is triggered', () => {
    router.navigate.and.returnValue(['../']);
    let onCancel = spyOn(component, 'onCancel');
    onCancel.call(router.navigate());
    expect(router.navigate.calls.count()).toBe(1);
    expect(router.navigate()).toEqual(['../']);
  });

  describe('User clicks on save button', () => {
    it('should submit a new car if not in edit mode', () => {
      editMode = false;
      let form = setUpForm(component.carForm, carMockEmptyData[0]);
      let formValues = setFormValues(form, carMockNewData[0]);
      serviceSpy.addCar(formValues.value);
      expect(serviceSpy.getCar(formValues.value)).toBe(formValues.value);
    });

    it('should submit an edited car if in edit mode', () => {
      let params = getParams(activatedRoute, expectedCar);
      let form = setUpForm(component.carForm, carMockData[params]);
      let formValues = setFormValues(form, carMockEditedData[0]);
      serviceSpy.updateCar(formValues.value);
      expect(serviceSpy.getCar(formValues.value)).toBe(formValues.value);
    });
  });
});

function setUpForm(form: FormGroup, car: Car) {
  form = new FormGroup({
    name: new FormControl(car.name, Validators.required),
    imagePath: new FormControl(car.imagePath, Validators.required),
    year: new FormControl(car.year, Validators.required),
    model: new FormControl(car.model, Validators.required),
    color: new FormControl(car.color, Validators.required),
    horsePower: new FormControl(car.horsePower, Validators.required),
    cylinder: new FormControl(car.cylinder, Validators.required),
  });
  return form;
}

function setFormValues(form: FormGroup, car: Car) {
  form.controls.name.setValue(car.name);
  form.controls.imagePath.setValue(car.imagePath);
  form.controls.year.setValue(car.year);
  form.controls.model.setValue(car.model);
  form.controls.color.setValue(car.color);
  form.controls.horsePower.setValue(car.horsePower);
  form.controls.cylinder.setValue(car.cylinder);
  return form;
}

function getParams(activatedRoute: ActivateRouteStub, expectedCar: Car) {
  let carId: number;
  activatedRoute = new ActivateRouteStub({ id: expectedCar.id });
  activatedRoute.paramMap.subscribe((params) => (carId = +params.get('id')));
  return carId;
}

class DataStorageServiceSpy {
  testCar: Car[] = [
    new Car(
      'Porsche',
      2020,
      'Cyan',
      'White',
      434,
      8,
      'https://images.dealer.com/ddc/vehicles/2020/Porsche/Cayenne/SUV/color/Biscay%20Blue%20Metallic-4A-37,69,120-640-en_US.jpg',
      0
    ),
  ];

  getCars() {
    return this.testCar;
  }

  getCar(car: Car) {
    return this.testCar[this.testCar.indexOf(car)];
  }

  addCar(car: Car) {
    this.testCar.push(car);
  }

  updateCar(car: Car) {
    this.testCar[this.testCar.indexOf(car)] = car;
  }
}
