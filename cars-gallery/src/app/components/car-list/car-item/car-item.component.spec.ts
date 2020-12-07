import { RouterLinkDirectiveStub } from 'src/app/testing/router-link-directive-stub';
import { fakeAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CarItemComponent } from './car-item.component';
import { carMockData } from 'src/app/mock/carMockData';
import { By } from '@angular/platform-browser';

describe('CarItemComponent', () => {
  let fixture: ComponentFixture<CarItemComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let debugElement: DebugElement[];
  let component: CarItemComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarItemComponent, RouterLinkDirectiveStub],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CarItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    routerLinks = debugElement.map((debugElement) =>
      debugElement.injector.get(RouterLinkDirectiveStub)
    );
    component.carId = carMockData[0].id;
    component.car = carMockData[0];
    fixture.detectChanges();
  }));

  it('should get routerLink from template', () => {
    expect(routerLinks.length).toBe(1);
    expect(routerLinks[0].linkParams).toEqual([0]);
  });

  it('should navigate to /id when the a href element is clicked', () => {
    debugElement[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(routerLinks[0].navigatedTo).toEqual([0]);
  });

  it('should display the name of the car', () => {
    let fixture = TestBed.createComponent(CarItemComponent);
    let component = fixture.componentInstance;
    let debugElement = fixture.debugElement.query(
      By.css('.list-group-item-heading')
    );
    let nativeElement = debugElement.nativeElement;
    let expectedCar = carMockData[0];
    component.car = expectedCar;
    fixture.detectChanges();
    expect(nativeElement.textContent).toContain(expectedCar.name);
  });

  it('should display the model of the car', () => {
    let fixture = TestBed.createComponent(CarItemComponent);
    let component = fixture.componentInstance;
    let debugElement = fixture.debugElement.query(
      By.css('.list-group-item-text')
    );
    let nativeElement = debugElement.nativeElement;
    let expectedCar = carMockData[0];
    component.car = expectedCar;
    fixture.detectChanges();
    expect(nativeElement.textContent).toContain(expectedCar.model);
  });
  it('should display the image of the car', () => {
    let fixture = TestBed.createComponent(CarItemComponent);
    let component = fixture.componentInstance;
    let expectedCar = carMockData[0];
    component.car = expectedCar;
    fixture.detectChanges();
    const nativeElement = fixture.debugElement.nativeElement;
    expect(nativeElement.querySelector('span.pull-right>img').src).toContain(
      expectedCar.imagePath
    );
  });
});
