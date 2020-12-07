import { FilterPipe } from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CarItemComponent } from './components/car-list/car-item/car-item.component';
import { CarsGalleryComponent } from './pages/cars-gallery/cars-gallery.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarLandingComponent } from './pages/car-landing/car-landing.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { DataStorageService } from './services/data-storage.service';
import { DropDownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    CarsGalleryComponent,
    CarLandingComponent,
    CarDetailComponent,
    DropDownDirective,
    CarListComponent,
    CarItemComponent,
    CarEditComponent,
    HeaderComponent,
    AppComponent,
    FilterPipe,
  ],
  imports: [
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [ApiService, DataStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
