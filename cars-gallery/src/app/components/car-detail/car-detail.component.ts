import { DataStorageService } from './../../services/data-storage.service';
import { slideAnimation } from './../../animations/slideAnimation';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Car } from './../../models/car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  animations: [slideAnimation],
})
export class CarDetailComponent implements OnInit {
  carId: number;
  car: Car;

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.carId = +params['id'];
      this.car = this.dataStorageService.getCar(this.carId);
    });
  }

  onDeleteCar() {
    this.dataStorageService.deleteCar(this.carId);
    this.router.navigate([''], { relativeTo: this.route });
  }
}
