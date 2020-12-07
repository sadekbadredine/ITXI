import { CarsGalleryComponent } from './pages/cars-gallery/cars-gallery.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarLandingComponent } from './pages/car-landing/car-landing.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/cars-gallery', pathMatch: 'full' },
  {
    path: 'cars-gallery',
    component: CarsGalleryComponent,
    children: [
      {
        path: 'new',
        component: CarEditComponent,
        data: { animation: 'editPageSate' },
      },

      {
        path: ':id',
        component: CarDetailComponent,
        data: { animation: 'detailPageSate' },
      },
      {
        path: ':id/edit',
        component: CarEditComponent,
        data: { animation: 'editPageSate' },
      },
      {
        path: '',
        component: CarLandingComponent,
        data: { animation: 'landingPageSate' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
