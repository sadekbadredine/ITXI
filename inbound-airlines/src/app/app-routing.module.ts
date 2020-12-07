import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlinesFormPageComponent } from './pages/airlines-form-page/airlines-form-page.component';
import { AirlinesPageComponent } from './pages/airlines-page/airlines-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'airlines', pathMatch: 'full' },
  { path: 'airlines', component: AirlinesPageComponent },
  { path: 'edit', component: AirlinesFormPageComponent },
  { path: 'new', component: AirlinesFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
