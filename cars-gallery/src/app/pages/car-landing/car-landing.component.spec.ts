import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CarLandingComponent } from './car-landing.component';
import { DebugElement } from '@angular/core';

describe('Component: CarLandingComponent', () => {
  let app: CarLandingComponent;
  let fixture: ComponentFixture<CarLandingComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarLandingComponent],
    });
    fixture = TestBed.createComponent(CarLandingComponent);
    app = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should display Please select a Car', () => {
    fixture.detectChanges();
    expect(
      debugElement.nativeElement.querySelector('h3').textContent
    ).toContain('Please select a Car');
  });
});
