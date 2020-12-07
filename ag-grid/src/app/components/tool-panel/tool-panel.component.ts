import { IToolPanel, IToolPanelParams } from 'ag-grid-community';
import { MatCheckbox } from '@angular/material/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
})
export class ToolPanelComponent implements IToolPanel {
  params: IToolPanelParams;
  columns = [];

  constructor(private cookieService: CookieService) {}

  agInit(params: IToolPanelParams): void {
    let loadedState = JSON.parse(this.cookieService.get('state'));
    if (loadedState.length == 12) {
      this.params = params;
      let loadedStateToShow = [];
      for (const key in loadedState) {
        if (Object.prototype.hasOwnProperty.call(loadedState, key)) {
          let loadedColId = loadedState[key].colId;
          let loadedVisibility = loadedState[key].hide;
          loadedStateToShow.push({
            colId: this.getColumnName(loadedColId),
            hide: loadedVisibility,
          });
        }
      }
      this.columns = loadedStateToShow;
    } else {
      this.params = params;
      this.getHeaderNames(params);
    }
  }

  onNgModelChange(event: MatCheckbox, column) {
    let selectedColumn = column;
    let columnState = this.columns;
    let state = [];
    if (event.checked == true) column.hide = false;
    else column.hide = true;
    columnState[columnState.indexOf(selectedColumn)] = selectedColumn;
    state = columnState.map((item) => {
      let container = {};
      container['colId'] = this.getColumnId(item.colId);
      container['hide'] = item.hide;
      return container;
    });
    (this.params.api as any).myObserver.next(state);
  }

  getHeaderNames(params: IToolPanelParams) {
    let columnDefs = params.api.getColumnDefs();
    let headerNames: Array<string> = [];
    let initialcolumnsState = [];
    for (const key in columnDefs) {
      if (Object.prototype.hasOwnProperty.call(columnDefs, key)) {
        const element = columnDefs[key].headerName;
        headerNames.push(element);
      }
    }
    headerNames.map((item) => {
      initialcolumnsState.push({ colId: item, hide: false });
    });
    console.log(initialcolumnsState);
    console.log('initial column state');

    this.columns = initialcolumnsState;
  }

  getColumnId(columnName: string) {
    let columnId;
    switch (columnName) {
      case 'Ref':
        columnId = 'ref';
        break;
      case 'Name':
        columnId = 'name';
        break;
      case 'Age':
        columnId = 'age';
        break;
      case 'Nationality':
        columnId = 'nationality';
        break;
      case 'Gender':
        columnId = 'gender';
        break;
      case 'Country Origin':
        columnId = 'countryOrigin';
        break;
      case 'Residence Country':
        columnId = 'residenceCountry';
        break;
      case 'Arrival Date':
        columnId = 'arrivalDate';
        break;
      case 'Submitted Time':
        columnId = 'submittedTime';
        break;
      case 'Flight #':
        columnId = 'flight';
        break;
      case 'Type':
        columnId = 'type';
        break;
      case 'Status':
        columnId = 'status';
        break;
    }
    return columnId;
  }

  getColumnName(columnId: string) {
    let columnName;
    switch (columnId) {
      case 'ref':
        columnName = 'Ref';
        break;
      case 'name':
        columnName = 'Name';
        break;
      case 'age':
        columnName = 'Age';
        break;
      case 'nationality':
        columnName = 'Nationality';
        break;
      case 'gender':
        columnName = 'Gender';
        break;
      case 'countryOrigin':
        columnName = 'Country Origin';
        break;
      case 'residenceCountry':
        columnName = 'Residence Country';
        break;
      case 'arrivalDate':
        columnName = 'Arrival Date';
        break;
      case 'submittedTime':
        columnName = 'Submitted Time';
        break;
      case 'flight':
        columnName = 'Flight #';
        break;
      case 'type':
        columnName = 'Type';
        break;
      case 'status':
        columnName = 'Status';
        break;
    }
    return columnName;
  }

  refresh() {}
}
