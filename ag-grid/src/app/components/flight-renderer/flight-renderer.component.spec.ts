import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRendererComponent } from './flight-renderer.component';

describe('FlightRendererComponent', () => {
  let component: FlightRendererComponent;
  let fixture: ComponentFixture<FlightRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
