import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { TranslationService } from 'src/app/services/translation.service';
import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent implements OnInit, DoCheck {
  switchLanguageTranslation = 'Switch Language';
  selectedLanguage: string = 'en';
  isChecked: boolean = false;
  languageForm: FormGroup;
  radioButtonTextStyle;
  languages = [
    'Deuthsch',
    'English',
    'Español',
    'Français',
    'Italiano',
    'Português',
    '中文(Zhōngwén)',
  ];

  constructor(
    private translationService: TranslationService,
    private themeManagementService: ThemeManagementService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();
    let languageToBeLoaded;
    if (localStorage.getItem('language') === 'en')
      languageToBeLoaded = 'English';
    if (localStorage.getItem('language') === 'es')
      languageToBeLoaded = 'Español';
    this.languageForm = new FormGroup({
      lang: new FormControl(languageToBeLoaded),
    });
  }

  ngDoCheck() {
    if (this.themeManagementService.radioButtonTextStyle != undefined)
      this.radioButtonTextStyle = this.themeManagementService.radioButtonTextStyle;
    if (this.translationService.selectedLanguage != undefined)
      this.translationService.selectedLanguage.subscribe((language) => {
        this.selectedLanguage = language;
        this.getTranslation();
      });
  }

  onSubmit() {
    console.log(this.languageForm.value);
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate
      .get('SWITCH LANGUAGE', { value: '' })
      .subscribe((switchLanguage) => {
        this.switchLanguageTranslation = switchLanguage;
      });
  }

  getSelectedLanguage(selectedLanguage) {
    this.translationService.setSelectedLanuge(selectedLanguage);
  }
}
