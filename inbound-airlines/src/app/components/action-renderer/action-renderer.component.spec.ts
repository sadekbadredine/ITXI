import { ActionRendererComponent } from './action-renderer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellRendererService } from '../../services/cell-renderer.service';
import { DebugElement } from '@angular/core';

describe('ActionRendererComponent', () => {
  let cellRendererServiceSpy: Partial<CellRendererService>;
  let fixture: ComponentFixture<ActionRendererComponent>;
  let componentCellRendererService: CellRendererService;
  let cellRendererService: CellRendererService;
  let component: ActionRendererComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    cellRendererServiceSpy = {
      flightNumber: ['123'],
    };
    TestBed.configureTestingModule({
      declarations: [ActionRendererComponent],
      providers: [
        { provide: CellRendererService, useValue: cellRendererServiceSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ActionRendererComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    cellRendererService = debugElement.injector.get(CellRendererService);
    componentCellRendererService = cellRendererService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
