export class ThemeManagementServiceSpy {
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
      color: 'rgb(0, 0, 0)',
    };
    this.countTextColor = 'rgb(0, 0, 0)';
    this.cardBackgroundColor = {
      'background-color': 'rgb(255, 255, 255)',
    };
    this.cardTextColor = {
      color: 'rgb(0, 0, 0)',
    };
    this.outerCardBackgroundColor = {
      backgroundColor: 'rgb(237, 244, 248)',
    };
    this.darkButtonColor = {
      backgroundColor: 'rgb(128, 128, 128)',
      color: 'rgb(255, 255, 255)',
    };
    this.lightButtonColor = {
      backgroundColor: 'rgb(211, 211, 211)',
      color: 'rgb(0, 0, 0)',
    };
  }

  setDarkTheme() {
    localStorage.setItem('theme', 'dark');
    this.cardHeaderTextColor = {
      color: 'rgb(255, 255, 255)',
    };
    this.countTextColor = 'rgb(255, 255, 255)';
    this.cardBackgroundColor = {
      'background-color': 'rgb(128, 128, 128)',
    };
    this.cardTextColor = {
      color: 'black',
    };
    this.outerCardBackgroundColor = {
      backgroundColor: 'rgb(66, 66, 66)',
    };
    this.darkButtonColor = {
      backgroundColor: 'rgb(211, 211, 211)',
      color: 'rgb(0, 0, 0)',
    };
    this.lightButtonColor = {
      backgroundColor: 'rgb(128, 128, 128)',
      color: 'rgb(255, 255, 255)',
    };
  }
}
