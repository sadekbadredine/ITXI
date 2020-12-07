import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ParentComponent } from './pages/parent/parent.component';
import { ChildComponent } from './components/child/child.component';
import { DaughterComponent } from './components/daughter/daughter.component';
import { SonComponent } from './components/son/son.component';
import { UncleComponent } from './pages/uncle/uncle.component';
import { EnfantComponent } from './components/enfant/enfant.component';
import { PredecessorComponent } from './components/predecessor/predecessor.component';
import { HeaderComponent } from './components/header/header.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent', component: ParentComponent },
  { path: 'uncle', component: UncleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    SonComponent,
    DaughterComponent,
    ParentComponent,
    UncleComponent,
    EnfantComponent,
    PredecessorComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
