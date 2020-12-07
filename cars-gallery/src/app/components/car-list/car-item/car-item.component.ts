import { slideAnimation } from './../../../animations/slideAnimation';
import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
  animations: [slideAnimation],
})
export class CarItemComponent implements OnInit {
  @Input() carId: number;
  @Input() car: Car;

  constructor() {}

  ngOnInit(): void {}
}
