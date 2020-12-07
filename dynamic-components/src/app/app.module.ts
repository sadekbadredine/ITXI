import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DomPositionDirective } from './directives/dom-position.directive';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    DomPositionDirective,
    AlertComponent,
    HomeComponent,
    AppComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
