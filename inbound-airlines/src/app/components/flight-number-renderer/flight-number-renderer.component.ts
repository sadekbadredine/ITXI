import { CellRendererService } from '../../services/cell-renderer.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-number-renderer',
  templateUrl: './flight-number-renderer.component.html',
  styleUrls: ['./flight-number-renderer.component.scss'],
})
export class FlightNumberRendererComponent implements ICellRendererAngularComp {
  flightNumbers = [];

  constructor(private cellRendererService: CellRendererService) {}

  agInit(params: ICellRendererParams) {
    this.flightNumbers = params.value;
    this.cellRendererService.flightNumber = this.flightNumbers;
  }
  setMargin() {
    if (this.flightNumbers.length <= 6) {
      return { 'margin-top': '9px' };
    }
  }

  refresh() {
    return false;
  }
}
