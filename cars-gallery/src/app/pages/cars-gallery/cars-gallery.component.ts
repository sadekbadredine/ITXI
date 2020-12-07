import { routeAnimation } from './../../animations/slideAnimation';
import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars-gallery.component.html',
  styleUrls: ['./cars-gallery.component.scss'],
  animations: [routeAnimation],
})
export class CarsGalleryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
