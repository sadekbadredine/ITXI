import { UncleComponent } from './pages/uncle/uncle.component';
import { ParentComponent } from './pages/parent/parent.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent', component: ParentComponent },
  { path: 'uncle', component: UncleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
