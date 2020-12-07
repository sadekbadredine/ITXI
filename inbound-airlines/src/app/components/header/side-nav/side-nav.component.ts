import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { TranslationService } from 'src/app/services/translation.service';
import { MatSidenav } from '@angular/material/sidenav/sidenav';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  DoCheck,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, DoCheck {
  @ViewChild('sidenav') sidenav: MatSidenav;
  sideNavBackgroundColor = { 'background-color': 'rgb(66, 66, 66)' };
  lighButtonText = 'Light';
  darkButtonText = 'Dark';
  contentHeightAndWidth;
  isOpen: boolean = true;
  contentBackgroundColor: {
    'background-color': string;
    width?: string;
    height?: string;
  };
  selectedLanguage: string = 'en';
  lightModeButton = {
    backgroundColor: ' rgb(211,211,211)',
    color: 'black',
  };
  darkModeButton = {
    backgroundColor: ' rgb(128,128,128)',
    color: 'white',
  };

  constructor(
    private themeManagementService: ThemeManagementService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();
  }

  ngDoCheck() {
    if (this.themeManagementService.backgroundColor != undefined)
      this.contentBackgroundColor = this.themeManagementService.backgroundColor;
    if (this.themeManagementService.sideNavBackgroundColor != undefined)
      this.sideNavBackgroundColor = this.themeManagementService.sideNavBackgroundColor;
    if (this.themeManagementService.lightModeButton != undefined)
      this.lightModeButton = this.themeManagementService.lightModeButton;
    if (this.themeManagementService.darkModeButton != undefined)
      this.darkModeButton = this.themeManagementService.darkModeButton;
    if (this.translationService.selectedLanguage != undefined)
      this.translationService.selectedLanguage.subscribe((language) => {
        this.selectedLanguage = language;
        this.getTranslation();
      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.contentBackgroundColor.width = `${innerWidth}px`;
    this.contentBackgroundColor.height = `${innerHeight - 50}px`;
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate.get('DARK', { value: '' }).subscribe((dark) => {
      this.darkButtonText = dark;
    });
    this.translate.get('LIGHT', { value: '' }).subscribe((light) => {
      this.lighButtonText = light;
    });
  }

  toggleSideNav() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.sidenav.close();
    if (!this.isOpen) this.sidenav.open();
  }

  switchToDarkMode() {
    this.themeManagementService.setToDarkTheme();
  }

  switchToLightMode() {
    this.themeManagementService.setToLightTheme();
  }
}
