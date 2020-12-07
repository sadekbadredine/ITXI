import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-airline-code-renderer',
  templateUrl: './airline-code-renderer.component.html',
  styleUrls: ['./airline-code-renderer.component.scss'],
})
export class AirlineCodeRendererComponent
  implements ICellRendererAngularComp, DoCheck {
  airlineCodeNoImageStyle;
  airlineCode: string;
  logoImagePath: string;
  logoStyle = {
    height: '30px',
    width: '30px',
  };

  constructor(private themeManagemementService: ThemeManagementService) {}

  ngDoCheck(): void {
    if (this.themeManagemementService.airlineCodeNoImageStyle != undefined)
      this.airlineCodeNoImageStyle = this.themeManagemementService.airlineCodeNoImageStyle;
  }

  agInit(params: ICellRendererParams) {
    this.setAirlineLogo(params.value);
  }

  refresh() {
    return false;
  }

  private setAirlineLogo(code: string) {
    this.airlineCode = code;
    switch (code) {
      case 'UU':
        this.logoImagePath = 'assets/airlines-logo/air-austral.png';
        break;
      case 'AF':
        this.logoImagePath = 'assets/airlines-logo/air-france.png';
        break;
      case 'MK':
        this.logoImagePath = 'assets/airlines-logo/air-mauritius.png';
        break;
      case 'HM':
        this.logoImagePath = 'assets/airlines-logo/air-seychelles.png';
        break;
      case 'OS':
        this.logoImagePath = 'assets/airlines-logo/austria-airlines.png';
        break;
      case 'BA':
        this.logoImagePath = 'assets/airlines-logo/british-airways.png';
        break;
      case 'DE':
        this.logoImagePath = 'assets/airlines-logo/condor-airlines.png';
        break;
      case 'WK':
        this.logoImagePath = 'assets/airlines-logo/edelweiss-air.png';
        break;
      case 'EK':
        this.logoImagePath = 'assets/airlines-logo/emirates-airlines.png';
        break;
      case 'ET':
        this.logoImagePath = 'assets/airlines-logo/ethiopian-airlines.jpg';
        break;
      case 'EY':
        this.logoImagePath = 'assets/airlines-logo/etihad-airways-logo.png';
        break;
      case 'KQ':
        this.logoImagePath = 'assets/airlines-logo/kenya-airways.png';
        break;
      case 'QR':
        this.logoImagePath = 'assets/airlines-logo/qatar-airline.png';
        break;
      case 'UL':
        this.logoImagePath = 'assets/airlines-logo/srilankan-airlines.jpg';
        break;
      case 'TK':
        this.logoImagePath = 'assets/airlines-logo/turkish-airline.png';
        break;
      default:
        break;
    }
  }
}
