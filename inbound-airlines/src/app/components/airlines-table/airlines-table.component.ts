import { FlightNumberRendererComponent } from '../flight-number-renderer/flight-number-renderer.component';
import { AirlineCodeRendererComponent } from '../airline-code-renderer/airline-code-renderer.component';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { RouterService } from 'src/app/services/router.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface InboundAirlines {
  inboundAirlines: [
    {
      code: string;
      name: string;
      flightNumbers: Array<Number>;
      actions: any;
    }
  ];
}

@Component({
  selector: 'app-airlines-table',
  templateUrl: './airlines-table.component.html',
  styleUrls: ['./airlines-table.component.scss'],
})
export class AirlinesTableComponent implements OnInit, DoCheck {
  inputStyle: { 'background-color': string; color: string; width?: string };
  tableWidthAndHeight: { width: string; height: string };
  flightNumbersHeaderName = 'Flight Numbers';
  translatedHeaderNames: Array<string> = [];
  airlineNameHeaderName = 'Airline Name';
  airlineCodHeaderName = 'Airline Code';
  inputPlaceholder: string = 'Filter';
  actionsHeaderName = 'actions';
  selectedLanguage = 'en';
  frameworkComponents;
  separatorStyle;
  gridColumnApi;
  defaultColDef;
  gridApiParams;
  agGridClass;
  searchValue;
  columnDefs;
  gridApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private routerService: RouterService,
    private themeManagementService: ThemeManagementService,
    private translationService: TranslationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.columnDefs = this.getColumnDefs();
    this.defaultColDef = {
      wrapText: true,
      autoHeight: true,
      resizable: true,
    };
    this.frameworkComponents = {
      customAirlineCodeRenderer: AirlineCodeRendererComponent,
      customFlightNumber: FlightNumberRendererComponent,
      customActionRenderer: ActionRendererComponent,
    };
    this.inputStyle = { 'background-color': '', color: '' };
  }

  ngDoCheck() {
    if (this.themeManagementService.filterInputStyle != undefined)
      this.inputStyle = this.themeManagementService.filterInputStyle;
    if (this.themeManagementService.agGridClass != undefined) {
      this.agGridClass = this.themeManagementService.agGridClass;
    }
    this.getScreenSize();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
      .get('assets/inbound_airline_mockData.json')
      .subscribe((data: InboundAirlines) => {
        params.api.setRowData(data.inboundAirlines);
      });
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();

    this.translationService.selectedLanguage.subscribe((selectedLanguage) => {
      this.selectedLanguage = selectedLanguage;
      this.getTranslation();
    });
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    };
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.inputStyle.width = `${innerWidth - 187}px`;
    this.separatorStyle = {
      width: `${innerWidth - 117}px`,
    };
  }

  onColumnResized(params) {
    params.api.resetRowHeights();
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate
      .get('AIRLINE CODE', { value: '' })
      .subscribe((airlineCode) => {
        this.translatedHeaderNames.push(airlineCode);
      });
    this.translate
      .get('AIRLINE NAME', { value: '' })
      .subscribe((airlineName) => {
        this.translatedHeaderNames.push(airlineName);
      });
    this.translate
      .get('FLIGHT NUMBERS', { value: '' })
      .subscribe((flightNumbers) => {
        this.translatedHeaderNames.push(flightNumbers);
      });
    this.translate.get('ACTIONS', { value: '' }).subscribe((actions) => {
      this.translatedHeaderNames.push(actions);
      this.setHeaderNames(this.translatedHeaderNames);
      this.translatedHeaderNames = [];
    });
    this.translate.get('FILTER', { value: '' }).subscribe((filter) => {
      this.inputPlaceholder = filter;
    });
  }

  setHeaderNames(headerNames: Array<string>) {
    let columnDefs = this.getColumnDefs();
    columnDefs.forEach(function (colDef, index) {
      colDef.headerName = headerNames[index];
    });
    this.gridApi.setColumnDefs(columnDefs);
    this.gridApi.refreshCells({ force: true });
  }

  getColumnDefs() {
    return [
      {
        headerName: this.airlineCodHeaderName,
        field: 'code',
        cellRenderer: 'customAirlineCodeRenderer',
      },
      { headerName: this.airlineNameHeaderName, field: 'name' },
      {
        headerName: this.flightNumbersHeaderName,
        field: 'flightNumbers',
        cellRenderer: 'customFlightNumber',
        width: 400,
      },
      {
        headerName: this.actionsHeaderName,
        field: 'actions',
        cellRenderer: 'customActionRenderer',
        width: 145,
      },
    ];
  }
  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  onRowClicked(params) {
    this.routerService.airlineData = params.data;
    this.router.navigateByUrl('edit');
  }

  ngOnDestroy(): void {
    // this.selectedLanguageSubscirption.unsubscribe();
  }
}
