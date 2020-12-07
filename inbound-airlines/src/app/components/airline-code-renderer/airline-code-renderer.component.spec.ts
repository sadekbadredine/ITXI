import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineCodeRendererComponent } from './airline-code-renderer.component';

describe('AirlineCodeRendererComponent', () => {
  let component: AirlineCodeRendererComponent;
  let fixture: ComponentFixture<AirlineCodeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineCodeRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineCodeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
