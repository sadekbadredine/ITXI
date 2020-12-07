import { DataStorageService } from './../../services/data-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { slideAnimation } from './../../animations/slideAnimation';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss'],
  animations: [slideAnimation],
})
export class CarEditComponent implements OnInit {
  carForm: FormGroup;
  editMode: boolean;
  carId: number;

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.carId = +params['id'];
      if (params['id']) this.editMode = true;
      this.initForm();
      console.log(this.carForm.status);
      // this.editMode = params['id'] != null; same functionality as above code
      // we check if we're in edit mode or not by checking if we have an id in the route
    });
  }

  private initForm() {
    let carName = '';
    let carImagePath = '';
    let carYear = null;
    let carModel = null;
    let carColor = '';
    let carHorsePower = null;
    let carCylinder = null;

    if (this.editMode) {
      const car = this.dataStorageService.getCar(this.carId);
      carName = car.name;
      carImagePath = car.imagePath;
      carYear = car.year;
      carModel = car.model;
      carColor = car.color;
      carHorsePower = car.horsePower;
      carCylinder = car.cylinder;
    }
    this.carForm = new FormGroup({
      name: new FormControl(carName, Validators.required),
      imagePath: new FormControl(carImagePath, Validators.required),
      year: new FormControl(carYear, Validators.required),
      model: new FormControl(carModel, Validators.required),
      color: new FormControl(carColor, Validators.required),
      horsePower: new FormControl(carHorsePower, Validators.required),
      cylinder: new FormControl(carCylinder, Validators.required),
    });
  }

  onSubmit() {
    if (this.editMode)
      this.dataStorageService.updateCar(this.carForm.value, this.carId);
    else this.dataStorageService.addCar(this.carForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
