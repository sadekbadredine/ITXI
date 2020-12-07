import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { TranslationService } from 'src/app/services/translation.service';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { TranslateService } from '@ngx-translate/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airlines-edit',
  templateUrl: './airlines-edit.component.html',
  styleUrls: ['./airlines-edit.component.scss'],
})
export class AirlinesEditComponent implements OnInit, DoCheck {
  @ViewChild('flightNumbersChips') flightNumbersChips = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  flightNumbersTranslation = 'Flight Numbers';
  airlineCodeTranslation = 'Airline Code';
  airlineNameTranslation = 'Airline Name';
  formTitle = 'Add/Edit Inbound Airlines';
  cancelButtonText = 'Cancel';
  flightNumbers: any = [];
  cardTheme = 'card-dark';
  airlineForm: FormGroup;
  saveButtonText = 'Save';
  selectable = true;
  cancelButtonStyle;
  addOnBlur = true;
  removable = true;
  visible = true;

  constructor(
    private router: Router,
    private routerServie: RouterService,
    private themeManagementService: ThemeManagementService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.setUpForm(this.routerServie.airlineData);
    if (this.routerServie.airlineData.flightNumbers === undefined)
      this.flightNumbers = this.flightNumbersChips;
    else this.flightNumbers = this.routerServie.airlineData.flightNumbers;
  }

  ngDoCheck() {
    if (this.themeManagementService.cardTheme != undefined)
      this.cardTheme = this.themeManagementService.cardTheme;
    if (this.themeManagementService.cancelButtonStyle != undefined)
      this.cancelButtonStyle = this.themeManagementService.cancelButtonStyle;
    if (this.translationService.selectedLanguage != undefined) {
      this.translationService.selectedLanguage.subscribe((language) => {
        this.translate.setDefaultLang(language);
        this.translate.use(language);
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
        this.translate
          .get('FORM TITLE', { value: '' })
          .subscribe((formTitle) => {
            this.formTitle = formTitle;
          });
      });
    }
  }

  setUpForm(airlineData) {
    this.airlineForm = new FormGroup({
      airlineCode: new FormControl(airlineData.code, [
        Validators.minLength(2),
        Validators.maxLength(3),
        Validators.required,
      ]),
      airlineName: new FormControl(airlineData.name, Validators.required),
      flightNumbers: new FormControl(null, [Validators.maxLength(4)]),
    });
  }
  get airlineCode() {
    return this.airlineForm.get('ailineCode');
  }
  getAirlineCodeErrorMessage() {
    if (this.airlineForm.get('airlineCode').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.airlineForm.get('airlineCode').hasError('maxlength')) {
      return 'Airline Code must not exceed 3 characters long ';
    }
    if (this.airlineForm.get('airlineCode').hasError('minlength')) {
      return 'Airline Code must be at least 2 characters long ';
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
