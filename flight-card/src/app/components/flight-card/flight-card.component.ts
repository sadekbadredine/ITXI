import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit, DoCheck {
  @Input() quarantineCount: number = 0;
  @Input() rejectedCount: number = 0;
  @Input() approvedCount: number = 0;
  @Input() questionCount: number = 0;
  @Input() pendingCount: number = 0;
  @Input() examineCount: number = 0;
  @Input() subtitle: string = '';
  @Input() totalPax: number = 0;
  @Input() title: string = '';
  @Input() logo: string = '';
  textColor = { fill: 'white' };
  countTextColor = 'white';
  cardHeaderTextColor;
  cardBackgroundColor;
  lightButtonStyle;
  darkButtonStyle;

  constructor(private themeService: ThemeManagementService) {}

  ngOnInit(): void {
    this.totalPax =
      this.quarantineCount +
      this.rejectedCount +
      this.approvedCount +
      this.questionCount +
      this.pendingCount +
      this.examineCount;
    if (localStorage.getItem('theme') === 'dark') {
      this.setAppDarkTheme();
      this.setCardTheme();
    }
    if (localStorage.getItem('theme') === 'light') {
      this.setAppLightTheme();
      this.setCardTheme();
    }
  }

  ngDoCheck() {
    if (this.themeService.cardBackgroundColor != undefined) this.setCardTheme();
  }

  setCardTheme() {
    this.cardBackgroundColor = this.themeService.cardBackgroundColor;
    this.darkButtonStyle = this.themeService.darkButtonColor;
    this.lightButtonStyle = this.themeService.lightButtonColor;
    this.textColor = this.themeService.cardTextColor;
    this.countTextColor = this.themeService.countTextColor;
    this.cardHeaderTextColor = this.themeService.cardHeaderTextColor;
  }

  setAppLightTheme() {
    this.themeService.setLightTheme();
  }

  setAppDarkTheme() {
    this.themeService.setDarkTheme();
  }

  setTotalCountAxis(total: number) {
    if (total > 0 && total < 9) return '153';
    if (total > 9 && total < 99) return '145';
    if (total > 99 && total < 999) return '140';
    if (total > 999 && total < 9999) return '138';
    if (total > 9999 && total < 99999) return '135';
    else return '131';
  }

  setPersonAxis(total: number) {
    if (total == 0) return '125';
    if (total > 0 && total < 9) return '113';
    if (total > 9 && total < 99) return '110';
    if (total > 99 && total < 999) return '107';
    if (total > 999 && total < 9999) return '105';
    if (total > 9999 && total < 99999) return '102';
    else return '100';
  }

  setCountAxis(count: number) {
    if (count > 0 && count < 9) return '20';
    if (count > 9 && count < 99) return '14';
    if (count > 99 && count < 999) return '10';
    if (count > 999 && count < 9999) return '5';
    if (count > 9999 && count < 99999) return '3';
    else return '3';
  }
  setCountFontSize(count: number) {
    if (count > 0 && count < 9) return '20px';
    if (count > 9 && count < 99) return '20px';
    if (count > 99 && count < 999) return '20px';
    if (count > 999 && count < 9999) return '19px';
    if (count > 9999 && count < 99999) return '17px';
  }
}
