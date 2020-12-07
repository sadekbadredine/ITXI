import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterService } from '../router.service';

import { AirlinesTableComponent } from './airlines-table.component';

describe('AirlinesTableComponent', () => {
  let component: AirlinesTableComponent;
  let fixture: ComponentFixture<AirlinesTableComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };
  let routerServiceSpy: RouterServiceSpy;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      declarations: [AirlinesTableComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        { provide: Router, useValue: routerSpy },
        { provide: RouterService, useValue: routerServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class RouterServiceSpy {
  airlineData = {
    code: 'T12',
    name: 'Test 12',
    flightNumbers: ['555', '14454'],
  };
}
