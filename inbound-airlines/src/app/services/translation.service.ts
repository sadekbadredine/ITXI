import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  selectedLanguage = new Subject<string>();
  switchLanguageTranslation = 'Switch Language';
  flightNumbersTranslation = 'Flight Numbers';
  formTitle = 'Add/Edit Inbound Airlines';
  airlineCodeTranslation = 'Airline Code';
  airlineNameTranslation = 'Airline Name';
  cancelButtonText = 'Cancel';
  selectedLanguage2 = 'en';
  saveButtonText = 'Save';
  headerTitle;

  constructor(private ngxTranslateService: TranslateService) {}

  setSelectedLanuge(selectedLanguage: string) {
    let loadedLanguage: string;
    if (selectedLanguage === 'Español') {
      localStorage.setItem('language', 'es');
      loadedLanguage = localStorage.getItem('language');
      this.selectedLanguage.next(loadedLanguage);
    }
    if (selectedLanguage === 'English') {
      localStorage.setItem('language', 'en');
      loadedLanguage = localStorage.getItem('language');
      this.selectedLanguage.next(loadedLanguage);
    }
    // this.selectedLanguage2 = localStorage.getItem('language');
    // this.getTranslation(localStorage.getItem('lanuage'));
  }
  // TO ASK IN CODE REVIEW
  // getTranslation(selectedLanguage: string) {
  //   this.ngxTranslateService.setDefaultLang(selectedLanguage);
  //   this.ngxTranslateService.use(selectedLanguage);
  //   this.ngxTranslateService
  //     .get('HEADER TITLE', { value: '' })
  //     .subscribe((headerTitle) => {
  //       this.headerTitle = headerTitle;
  //     });
  // }
}
