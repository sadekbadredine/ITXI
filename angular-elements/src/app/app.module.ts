import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DocumentationExampleComponent } from './components/documentation-example/documentation-example.component';
import { PersonalExampleComponent } from './components/personal-example/personal-example.component';
import { UserHtmlInputComponent } from './components/user-html-input/user-html-input.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personal', component: PersonalExampleComponent },
  { path: 'documentation', component: DocumentationExampleComponent },
];

@NgModule({
  declarations: [
    UserHtmlInputComponent,
    AlertComponent,
    HomeComponent,
    AppComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
