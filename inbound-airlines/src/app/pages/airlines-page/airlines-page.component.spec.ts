import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AirlinesPageComponent } from './airlines-page.component';

describe('AirlinesPageComponent', () => {
  let component: AirlinesPageComponent;
  let fixture: ComponentFixture<AirlinesPageComponent>;
  let routerSpy: { navigate: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirlinesPageComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
