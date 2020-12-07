import { AirlinesEditComponent } from './airlines-edit.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterService } from '../../services/router.service';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

describe('AirlinesEditComponent', () => {
  let fixture: ComponentFixture<AirlinesEditComponent>;
  let routerServiceSpy: Partial<RouterService>;
  let componenetRouterService: RouterService;
  let routerSpy: { navigate: jasmine.Spy };
  let component: AirlinesEditComponent;
  let routerService: RouterService;
  let debugElement: DebugElement;

  beforeEach(() => {
    routerServiceSpy = {
      airlineData: {
        code: 'T12',
        name: 'Test 12',
        flightNumbers: ['555', '14454'],
      },
    };
    TestBed.configureTestingModule({
      declarations: [AirlinesEditComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: RouterService, useValue: routerServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AirlinesEditComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    routerService = debugElement.injector.get(RouterService);
    // componenetRouterService = routerService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
