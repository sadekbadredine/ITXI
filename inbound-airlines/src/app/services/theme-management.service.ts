import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeManagementService {
  sideNavBackgroundColor;
  airlineCodeNoImageStyle;
  radioButtonTextStyle;
  cancelButtonStyle;
  filterInputStyle;
  lightModeButton;
  backgroundColor;
  darkModeButton;
  iconTrashColor;
  agGridClass;
  cardTheme;

  setToLightTheme() {
    localStorage.setItem('theme', 'light-theme');
    this.cardTheme = 'card-light'; //
    this.backgroundColor = { 'background-color': 'rgb(237,244,248)' }; //
    this.filterInputStyle = {
      'background-color': 'rgb(246,246,246)',
      color: 'rgb(147,147,147)',
    };
    this.agGridClass = 'ag-theme-alpine';
    this.iconTrashColor = { fill: 'black' }; //
    this.sideNavBackgroundColor = { 'background-color': 'white' }; //
    this.lightModeButton = {
      backgroundColor: ' rgb(128,128,128)',
      color: 'white',
    }; //
    this.darkModeButton = {
      backgroundColor: ' rgb(211,211,211)',
      color: 'black',
    }; //
    this.airlineCodeNoImageStyle = {
      'background-color': 'black',
      color: 'white',
    }; //
    this.cancelButtonStyle = {
      'background-color': 'white',
      color: 'black',
    }; //
    this.radioButtonTextStyle = {
      color: 'black',
    };
  }

  setToDarkTheme() {
    localStorage.setItem('theme', 'dark-theme');
    this.radioButtonTextStyle = {
      color: 'white',
    };
    this.cancelButtonStyle = {
      'background-color': 'rgb(66,66,66)',
      color: 'white',
    };
    this.filterInputStyle = {
      'background-color': 'rgb(48,48,48)',
      color: 'rgb(147,147,147)',
    };
    this.agGridClass = 'ag-theme-alpine-dark';
    this.iconTrashColor = { fill: 'white' };
    this.sideNavBackgroundColor = { 'background-color': 'rgb(66,66,66)' };
    this.airlineCodeNoImageStyle = {
      'background-color': 'white',
      color: 'black',
    };
    this.backgroundColor = { 'background-color': 'rgb(48,48,48)' };
    this.cardTheme = 'card-dark';
    this.lightModeButton = {
      backgroundColor: ' rgb(211,211,211)',
      color: 'black',
    };
    this.darkModeButton = {
      backgroundColor: ' rgb(128,128,128)',
      color: 'white',
    };
  }
}
