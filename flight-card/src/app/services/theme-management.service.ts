import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeManagementService {
  cardBackgroundColor;
  cardTextColor;
  outerCardBackgroundColor;
  darkButtonColor;
  lightButtonColor;
  countTextColor;
  cardHeaderTextColor;

  setLightTheme() {
    localStorage.setItem('theme', 'light');
    this.cardHeaderTextColor = {
      color: 'black',
    };
    this.countTextColor = 'black';
    this.cardBackgroundColor = {
      'background-color': 'white',
    };
    this.cardTextColor = {
      color: 'black',
    };
    this.outerCardBackgroundColor = {
      'background-color': 'rgb(237,244,248)',
    };
    this.darkButtonColor = {
      backgroundColor: ' rgb(128,128,128)',
      color: 'white',
    };
    this.lightButtonColor = {
      backgroundColor: 'rgb(211,211,211)',
      color: 'black',
    };
  }

  setDarkTheme() {
    localStorage.setItem('theme', 'dark');
    this.cardHeaderTextColor = {
      color: 'white',
    };
    this.countTextColor = 'white';
    this.cardBackgroundColor = {
      'background-color': 'gray',
    };
    this.cardTextColor = {
      color: 'black',
    };
    this.outerCardBackgroundColor = {
      'background-color': 'rgb(66,66,66)',
    };
    this.darkButtonColor = {
      backgroundColor: ' rgb(211,211,211)',
      color: 'black',
    };
    this.lightButtonColor = {
      backgroundColor: 'rgb(128,128,128)',
      color: 'white',
    };
  }
}
