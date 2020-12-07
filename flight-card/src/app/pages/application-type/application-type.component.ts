import { Component, DoCheck, OnInit } from '@angular/core';
import { FlightCard } from 'src/app/models/flight-card.model';
import { ThemeManagementService } from 'src/app/services/theme-management.service';

@Component({
  selector: 'app-application-type',
  templateUrl: './application-type.component.html',
  styleUrls: ['./application-type.component.scss'],
})
export class ApplicationTypeComponent implements OnInit, DoCheck {
  flightCard: FlightCard;
  backgroundColor;
  constructor(private themeService: ThemeManagementService) {}

  ngOnInit(): void {
    this.flightCard = new FlightCard(
      'assets/emirates-airlines.png',
      'EK 705',
      '2020-10-12',
      null, //totalPax
      1, //pending
      10, //approved
      100, //rejected
      1000, //question
      10000, //examine
      100000 //quarantine
    );
  }

  ngDoCheck() {
    if (this.themeService.outerCardBackgroundColor != undefined)
      this.backgroundColor = this.themeService.outerCardBackgroundColor;
  }
}
