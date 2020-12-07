import { DataStorageService } from './../../services/data-storage.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {}

  onSaveData() {
    let cars: Car[];
    cars = this.dataStorageService.getCars();
    this.apiService.storeCars(cars);
  }

  onFetchData() {
    this.apiService.fetchCars().subscribe((cars) => {
      this.dataStorageService.setCars(cars);
    });
  }
}
