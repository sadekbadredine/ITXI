import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { CellRendererService } from '../../services/cell-renderer.service';
import { Component, DoCheck, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss'],
})
export class ActionRendererComponent
  implements ICellRendererAngularComp, DoCheck {
  iconTrashStyle;
  iconTrashColor = { fill: 'white' };
  rowHeight;

  constructor(
    private cellRendererService: CellRendererService,
    private themeManagemenetService: ThemeManagementService
  ) {
    this.getScreenSize();
  }

  ngDoCheck() {
    if (this.themeManagemenetService.iconTrashColor != undefined)
      this.iconTrashColor = this.themeManagemenetService.iconTrashColor;
  }

  agInit(params: ICellRendererParams) {
    this.iconTrashStyle = {
      'margin-top': `${params.node.rowHeight / 2 - 20}px`,
    };
    this.rowHeight = params.node.rowHeight;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize($event?) {
    if (this.cellRendererService.flightNumber.length > 6) {
      this.iconTrashStyle = { 'margin-top': `${this.rowHeight / 2 - 20}px` };
    }
    if (this.cellRendererService.flightNumber.length <= 6) {
      this.iconTrashStyle = { 'margin-top': `${this.rowHeight / 2 - 17}px` };
    }
  }
  refresh() {
    return true;
  }
}
