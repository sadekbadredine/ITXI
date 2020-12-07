import { DataStorageService } from './../../services/data-storage.service';
import { slideAnimation } from './../../animations/slideAnimation';
import { ApiService } from './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Car } from './../../models/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  animations: [slideAnimation],
})
export class CarListComponent implements OnInit {
  cars: Car[];

  constructor(
    private dataStorageService: DataStorageService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cars = this.dataStorageService.getCars();
    this.apiService.fetchCars().subscribe((cars) => {
      this.dataStorageService.setCars(cars);
    });
    this.dataStorageService.carsChanged.subscribe((cars) => {
      this.cars = cars;
    });
  }

  onAddCar() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
