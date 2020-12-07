import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular/';
import { NgModule } from '@angular/core';

import { FlightNumberRendererComponent } from './components/flight-number-renderer/flight-number-renderer.component';
import { AirlineCodeRendererComponent } from './components/airline-code-renderer/airline-code-renderer.component';
import { AirlinesFormPageComponent } from './pages/airlines-form-page/airlines-form-page.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { ActionRendererComponent } from './components/action-renderer/action-renderer.component';
import { AirlinesTableComponent } from './components/airlines-table/airlines-table.component';
import { AirlinesEditComponent } from './components/airlines-edit/airlines-edit.component';
import { AirlinesPageComponent } from './pages/airlines-page/airlines-page.component';
import { SideNavComponent } from './components/header/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeThemeDirective } from './directives/change-theme.directive';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterService } from './services/router.service';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    SideNavContentComponent,
    AirlinesPageComponent,
    AirlinesTableComponent,
    AirlineCodeRendererComponent,
    ChangeThemeDirective,
    FlightNumberRendererComponent,
    ActionRendererComponent,
    AirlinesEditComponent,
    AirlinesFormPageComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      // defaultLanguage: 'en',
    }),
    AgGridModule.withComponents({
      AirlineCodeRendererComponent,
      FlightNumberRendererComponent,
      ActionRendererComponent,
    }),
  ],
  providers: [RouterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
