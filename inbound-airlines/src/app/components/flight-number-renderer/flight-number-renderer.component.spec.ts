import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightNumberRendererComponent } from './flight-number-renderer.component';

describe('FlightNumberRendererComponent', () => {
  let component: FlightNumberRendererComponent;
  let fixture: ComponentFixture<FlightNumberRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightNumberRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightNumberRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
