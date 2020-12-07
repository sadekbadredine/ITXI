import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { RouterService } from 'src/app/services/router.service';
import { TranslateService } from '@ngx-translate/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airlines-form-page',
  templateUrl: './airlines-form-page.component.html',
  styleUrls: ['./airlines-form-page.component.scss'],
})
export class AirlinesFormPageComponent implements OnInit {
  @ViewChild('flightNumbersChips') flightNumbersChips = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  flightNumbersTranslation = 'Flight Numbers';
  airlineNameTranslation = 'Airline Name';
  airlineCodeTranslation = 'Airline Code';
  formTitle = 'Add/Edit Inbound Airlines';
  selectedLanguage: string = 'en';
  cancelButtonText = 'Cancel';
  saveButtonText = 'Save';
  cardTheme = 'card-dark';
  flightNumbers: any = [];
  airlineForm: FormGroup;
  selectable = true;
  cancelButtonStyle;
  addOnBlur = true;
  cardHeightAndWidth;
  removable = true;
  visible = true;
  requiredError = 'You must enter a value';
  maxLengthError = 'Airline Code must not exceed 3 characters long';
  minLengthError = 'Airline Code must be at least 2 characters long';
  titleFontSize;

  constructor(
    private router: Router,
    private routerServie: RouterService,
    private themeManagementService: ThemeManagementService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('theme') === 'light-theme')
      this.themeManagementService.setToLightTheme();
    if (localStorage.getItem('theme') === 'dark-theme')
      this.themeManagementService.setToDarkTheme();
    this.selectedLanguage = localStorage.getItem('language');
    this.getTranslation();
    this.setUpForm(this.routerServie.airlineData);
    if (this.routerServie.airlineData.flightNumbers === undefined)
      this.flightNumbers = this.flightNumbersChips;
    else this.flightNumbers = this.routerServie.airlineData.flightNumbers;
    this.getScreenSize();
  }

  ngDoCheck() {
    if (this.themeManagementService.cardTheme != undefined)
      this.cardTheme = this.themeManagementService.cardTheme;
    if (this.themeManagementService.cancelButtonStyle != undefined)
      this.cancelButtonStyle = this.themeManagementService.cancelButtonStyle;
    if (this.translationService.selectedLanguage != undefined) {
      this.translationService.selectedLanguage.subscribe((language) => {
        this.selectedLanguage = language;
        this.getTranslation();
      });
    }
  }

  @HostListener('window: resize', ['$event'])
  getScreenSize($event?) {
    this.cardHeightAndWidth = {
      height: `${innerHeight - 200}px`,
    };
    if (innerWidth <= 768) {
      this.titleFontSize = {
        'font-size': '20px',
      };
    }
    if (innerWidth >= 768) {
      this.titleFontSize = {
        'font-size': '25px',
      };
    }
  }

  getTranslation() {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate
      .get('AIRLINE CODE', { value: '' })
      .subscribe((airlineCode) => {
        this.airlineCodeTranslation = airlineCode;
      });
    this.translate
      .get('AIRLINE NAME', { value: '' })
      .subscribe((airlineName) => {
        this.airlineNameTranslation = airlineName;
      });
    this.translate
      .get('FLIGHT NUMBERS', { value: '' })
      .subscribe((flightNumbers) => {
        this.flightNumbersTranslation = flightNumbers;
      });
    this.translate.get('CANCEL', { value: '' }).subscribe((cancel) => {
      this.cancelButtonText = cancel;
    });
    this.translate.get('SAVE', { value: '' }).subscribe((save) => {
      this.saveButtonText = save;
    });
    this.translate.get('FORM TITLE', { value: '' }).subscribe((formTitle) => {
      this.formTitle = formTitle;
    });
    this.translate
      .get('REQUIRED ERROR', { value: '' })
      .subscribe((requiredError) => {
        this.requiredError = requiredError;
      });
    this.translate
      .get('MAX LENGTH ERROR', { value: '' })
      .subscribe((maxLengthError) => {
        this.maxLengthError = maxLengthError;
      });
    this.translate
      .get('MIN LENGTH ERROR', { value: '' })
      .subscribe((minLengthError) => {
        this.minLengthError = minLengthError;
      });
  }

  setUpForm(airlineData) {
    this.airlineForm = new FormGroup({
      airlineCode: new FormControl(airlineData.code, [
        Validators.minLength(2),
        Validators.maxLength(3),
        Validators.required,
      ]),
      airlineName: new FormControl(airlineData.name, Validators.required),
      flightNumbers: new FormControl(null, Validators.maxLength(4)),
    });
  }
  get airlineCode() {
    return this.airlineForm.get('ailineCode');
  }
  getAirlineCodeErrorMessage() {
    if (this.airlineForm.get('airlineCode').hasError('required')) {
      return this.requiredError;
    }
    if (this.airlineForm.get('airlineCode').hasError('maxlength')) {
      return this.maxLengthError;
    }
    if (this.airlineForm.get('airlineCode').hasError('minlength')) {
      return this.minLengthError;
    }
  }

  onAddChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.flightNumbers.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }
  onRemoveChip(flightNumber): void {
    const index = this.flightNumbers.indexOf(flightNumber);

    if (index >= 0) {
      this.flightNumbers.splice(index, 1);
    }
  }

  onCancel() {
    this.routerServie.airlineData = {};
    this.router.navigateByUrl('airlines');
  }

  onSubmit() {}
}
