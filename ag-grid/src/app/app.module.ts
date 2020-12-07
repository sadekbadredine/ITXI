import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MaterialModule } from './module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';

import { DisplayApplicationComponent } from './pages/display-application/display-application.component';
import { StatusRendererComponent } from './components/status-renderer/status-renderer.component';
import { FlightRendererComponent } from './components/flight-renderer/flight-renderer.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { CardComponentComponent } from './components/card-component/card-component.component';
import { ToolPanelComponent } from './components/tool-panel/tool-panel.component';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'ag-grid-enterprise';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    DisplayApplicationComponent,
    StatusRendererComponent,
    FlightRendererComponent,
    TableComponentComponent,
    CardComponentComponent,
    AppComponent,
    ToolPanelComponent,
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    AgGridModule.withComponents([
      FlightRendererComponent,
      StatusRendererComponent,
      ToolPanelComponent,
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
