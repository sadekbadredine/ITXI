import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { DomPositionDirective } from './directives/dom-position.directive';
import { ChangeThemeDirective } from './directives/change-theme.directive';
import { UnlessDirective } from './directives/unless.directive';
import { HomeComponent } from './pages/home/home.component';
import { PrettifyPipe } from './pipes/prettify.pipe';
import { AppComponent } from './app.component';

import { ModalComponent } from './modal/modal.component';

const routers: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:username', component: HomeComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    DomPositionDirective,
    ChangeThemeDirective,
    UnlessDirective,
    HomeComponent,
    AppComponent,
    PrettifyPipe,
    ModalComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routers)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
