import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarsGalleryComponent } from './cars-gallery.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CarsGalleryComponent', () => {
  let component: CarsGalleryComponent;
  let fixture: ComponentFixture<CarsGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsGalleryComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(CarsGalleryComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have <app-car-list></app-car-list> component selector', () => {
    fixture = TestBed.createComponent(CarsGalleryComponent);
    component = fixture.componentInstance;
    let htmlElements: HTMLElement = fixture.debugElement.nativeElement;
    expect(htmlElements.querySelector('app-car-list')).toBeDefined();
  });

  it('should have <router-outlet></router-outlet> directive', () => {
    fixture = TestBed.createComponent(CarsGalleryComponent);
    component = fixture.componentInstance;
    let htmlElements: HTMLElement = fixture.debugElement.nativeElement;
    expect(htmlElements.querySelector('router-outlet')).toBeDefined();
  });
});
