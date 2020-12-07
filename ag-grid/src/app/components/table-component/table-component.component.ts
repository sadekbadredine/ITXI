import { StatusRendererComponent } from '../status-renderer/status-renderer.component';
import { FlightRendererComponent } from '../flight-renderer/flight-renderer.component';
import { ToolPanelComponent } from '../tool-panel/tool-panel.component';
import { applications } from 'src/app/mock/applicationsMockData';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss'],
})
export class TableComponentComponent implements OnInit {
  frameworkComponents;
  gridColumnApi;
  columnsToShow;
  defaultColDef;
  columnDefs;
  tableWidth;
  gridApi;
  rowData;
  sideBar;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.columnDefs = this.getColumnDefs();
    this.defaultColDef = {
      autoHeight: true,
    };
    this.frameworkComponents = {
      customFlightRenderer: FlightRendererComponent,
      customStatusRenderer: StatusRendererComponent,
      customColumnsToolPanel: ToolPanelComponent,
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setRowData(applications);
    (this.gridApi as any).myObserver = new BehaviorSubject(null);
    (this.gridApi as any).myObserver.subscribe((value) => {
      if (value != undefined) {
        this.gridColumnApi.applyColumnState({
          state: value,
        });
        this.gridApi.sizeColumnsToFit();
        this.cookieService.set('state', JSON.stringify(value));
      }
    });
    this.gridColumnApi.applyColumnState({
      state: JSON.parse(this.cookieService.get('state')),
    });
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
    this.sideBar = {
      toolPanels: [
        {
          id: 'customColumns',
          labelDefault: 'Columns',
          labelKey: 'customColumns',
          iconKey: 'columns',
          toolPanel: 'customColumnsToolPanel',
        },
      ],
    };
  }
  toolPanelVisibleChanged() {
    if (this.gridApi.isToolPanelShowing()) this.gridApi.sizeColumnsToFit();
    else this.gridApi.sizeColumnsToFit();
  }
  onColumnResized(params) {
    params.api.resetRowHeights();
  }

  getColumnDefs() {
    return [
      { headerName: 'Ref', field: 'ref', minWidth: 90, maxWidth: 120 },
      {
        headerName: 'Name',
        field: 'name',
        minWidth: 90,
        maxWidth: 420,
      },
      { headerName: 'Age', field: 'age', minWidth: 77, maxWidth: 78 },
      {
        headerName: 'Nationality',
        field: 'nationality',
        minWidth: 121,
        maxWidth: 122,
      },
      { headerName: 'Gender', field: 'gender', minWidth: 97, maxWidth: 98 },
      {
        headerName: 'Country Origin',
        field: 'countryOrigin',
        minWidth: 143,
      },
      {
        headerName: 'Residence Country',
        field: 'residenceCountry',
        minWidth: 166,
      },
      {
        headerName: 'Arrival Date',
        field: 'arrivalDate',
        minWidth: 126,
      },
      {
        headerName: 'Submitted Time',
        field: 'submittedTime',
        minWidth: 150,
      },
      {
        headerName: 'Flight #',
        field: 'flight',
        cellRenderer: 'customFlightRenderer',
        minWidth: 99,
      },
      { headerName: 'Type', field: 'type', minWidth: 82, maxWidth: 150 },
      {
        headerName: 'Status',
        field: 'status',
        cellRenderer: 'customStatusRenderer',
        minWidth: 90,
      },
    ];
  }
}
