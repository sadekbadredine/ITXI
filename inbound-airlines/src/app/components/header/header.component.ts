import { TranslationService } from 'src/app/services/translation.service';
import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, DoCheck {
  headerTitle = 'Visitors Management Platform';
  selectedLanguage = 'en';
  settingsIconStyle;
  settingsIconMargin;
  constructor(
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();
    this.getScreenSize();
  }

  ngDoCheck() {
    if (this.translationService.selectedLanguage != undefined)
      this.translationService.selectedLanguage.subscribe((language) => {
        this.selectedLanguage = language;
        this.getTranslation();
        if (this.selectedLanguage === 'es') {
          this.getScreenSize();
        }
        if (this.selectedLanguage === 'en') {
          this.getScreenSize();
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    if (this.selectedLanguage === 'en') {
      this.settingsIconMargin = {
        'margin-left': `${innerWidth - 404}px`,
      };
    }
    if (this.selectedLanguage === 'es') {
      this.settingsIconMargin = {
        'margin-left': `${innerWidth - 450}px`,
      };
    }
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate
      .get('HEADER TITLE', { value: '' })
      .subscribe((headerTitle) => {
        this.headerTitle = headerTitle;
      });
  }
}
