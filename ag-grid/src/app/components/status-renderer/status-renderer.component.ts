import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-renderer',
  templateUrl: './status-renderer.component.html',
  styleUrls: ['./status-renderer.component.scss'],
})
export class StatusRendererComponent
  implements ICellRendererAngularComp, OnChanges {
  @Input() status: string;
  style: {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.setStatusColoredBox(changes.status.currentValue);
  }

  agInit(params: ICellRendererParams) {
    this.setStatusColoredBox(params.value);
  }

  private setStatusColoredBox(status: string) {
    switch (status) {
      case 'Quarantine':
        this.status = status;
        this.style = { 'background-color': 'red', color: 'white' };
        break;
      case 'Approved':
        this.status = status;
        this.style = {
          'background-color': ' rgba(113, 182, 68)',
          color: 'white',
        };
        break;
    }
  }

  refresh() {
    return false;
  }
}
