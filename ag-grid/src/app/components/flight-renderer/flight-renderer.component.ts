import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-flight-renderer',
  templateUrl: './flight-renderer.component.html',
  styleUrls: ['./flight-renderer.component.scss'],
})
export class FlightRendererComponent
  implements ICellRendererAngularComp, OnChanges {
  @Input() flight: string;
  @Input() logoStyle = {
    height: '30px',
    width: '30px',
  };

  logoImagePath: string;

  ngOnChanges(changes: SimpleChanges) {
    this.setAirlineLogo(changes.flight.currentValue);
  }

  agInit(params: ICellRendererParams) {
    this.setAirlineLogo(params.value);
  }

  private setAirlineLogo(flightNumber: string) {
    let flight = this.getAlphabetString(flightNumber);
    this.flight = flightNumber;
    if (flight === 'QR')
      this.logoImagePath = 'assets/airlines-logos/qatar-airline.png';
    if (flight === 'AR')
      this.logoImagePath = 'assets/airlines-logos/air-arabia-airline.png';
    if (flight === 'SAW')
      this.logoImagePath = 'assets/airlines-logos/turkish-airline.png';
  }

  private getAlphabetString(flightString: string) {
    let alphabetFlightString = '';
    for (let index = 0; index < flightString.length; index++) {
      let element = flightString[index];
      if (element >= 'A' && element <= 'z') alphabetFlightString += element;
    }
    return alphabetFlightString;
  }

  refresh() {
    return true;
  }
}
