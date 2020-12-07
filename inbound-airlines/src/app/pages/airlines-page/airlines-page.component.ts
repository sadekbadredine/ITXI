import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { TranslationService } from 'src/app/services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import {
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  OnDestroy,
  DoCheck,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-airlines-page',
  templateUrl: './airlines-page.component.html',
  styleUrls: ['./airlines-page.component.scss'],
})
export class AirlinesPageComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('card') card: ElementRef;
  titleFontSize: { 'font-size': string; 'min-width'?: string };
  title: string = 'Inbound Airlines';
  buttonText: string = 'Add new';
  cardWidth: { width: string };
  selectedLanguage = 'en';
  addNewButtonMargin: {};
  addNewButtonStyle;
  theme: string;

  constructor(
    private router: Router,
    private themeService: ThemeManagementService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();
    if (localStorage.getItem('theme') === 'light-theme')
      this.themeService.setToLightTheme();
    if (localStorage.getItem('theme') === 'dark-theme')
      this.themeService.setToDarkTheme();
    this.getScreenSize();
  }

  ngDoCheck() {
    if (this.themeService.cardTheme != undefined)
      this.theme = this.themeService.cardTheme;
    this.translationService.selectedLanguage.subscribe((language) => {
      this.selectedLanguage = language;
      this.getTranslation();
      this.getScreenSize();
    });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.cardWidth = {
      width: `${innerWidth - 150}px`,
    };
    if (innerWidth >= 768) {
      this.titleFontSize = {
        'font-size': '25px',
      };
      if (this.selectedLanguage === 'es') {
        this.titleFontSize['min-width'] = '300px';
        this.addNewButtonMargin = {
          'margin-left': `${innerWidth - 620}px`,
        };
      } else {
        this.addNewButtonMargin = {
          'margin-left': `${innerWidth - 590}px`,
        };
        this.titleFontSize['min-width'] = '300px';
      }
    }
    if (innerWidth <= 768) {
      this.titleFontSize = {
        'font-size': '20px',
      };
      if (this.selectedLanguage === 'es') {
        this.addNewButtonMargin = {
          'margin-left': `${innerWidth - 590}px`,
          'margin-top': '-5px',
        };
        this.titleFontSize['min-width'] = '272px';
      } else {
        this.addNewButtonMargin = {
          'margin-left': `${innerWidth - 590}px`,
          'margin-top': '-5px',
        };
        this.titleFontSize['min-width'] = '300px';
      }
    }
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate
      .get('INBOUND AIRLINES', { value: '' })
      .subscribe((title) => (this.title = title));
    this.translate
      .get('ADD NEW', { value: '' })
      .subscribe((buttonText) => (this.buttonText = buttonText));
  }

  onAddAilrline() {
    this.router.navigate(['new']);
  }

  ngOnDestroy() {}
}
