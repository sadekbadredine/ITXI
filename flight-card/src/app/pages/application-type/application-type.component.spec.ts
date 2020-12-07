import { ThemeManagementServiceSpy } from 'src/app/components/flight-card/ThemeManagementServiceSpy';
import { FlightCardComponent } from 'src/app/components/flight-card/flight-card.component';
import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { ApplicationTypeComponent } from './application-type.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/material.module';
import { By } from '@angular/platform-browser';

describe('ApplicationTypeComponent', () => {
  let applicationTypeComponent: ApplicationTypeComponent;
  let applicationTypeFixture: ComponentFixture<ApplicationTypeComponent>;
  let themeServiceSpy: ThemeManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationTypeComponent, FlightCardComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: ThemeManagementService,
          useClass: ThemeManagementServiceSpy,
        },
      ],
    }).compileComponents();

    applicationTypeFixture = TestBed.createComponent(ApplicationTypeComponent);
    applicationTypeComponent = applicationTypeFixture.componentInstance;
    themeServiceSpy = applicationTypeFixture.debugElement.injector.get(
      ThemeManagementService
    );
    applicationTypeFixture.detectChanges();
  });

  it(`Properties of FlightCardComponent are set from the parent component 
  ApplicationTypeComponent with property binding`, () => {
    const flightCardComponentProperties = applicationTypeComponent.flightCard;
    expect(flightCardComponentProperties.pendingCount).toEqual(1);
    expect(flightCardComponentProperties.approvedCount).toEqual(10);
    expect(flightCardComponentProperties.rejectedCount).toEqual(100);
    expect(flightCardComponentProperties.questionCount).toEqual(1000);
    expect(flightCardComponentProperties.examineCount).toEqual(10000);
    expect(flightCardComponentProperties.quarantineCount).toEqual(100000);
  });

  it(`In light theme, in applicationTypeComponent the div with class container that is wrapping 
  the fightCardComponent has a background color of rgb(237, 244, 248)`, () => {
    const outerBackground = applicationTypeFixture.debugElement.query(
      By.css('.container')
    ).nativeElement;
    themeServiceSpy.setLightTheme();
    applicationTypeFixture.detectChanges();

    expect(getComputedStyle(outerBackground).backgroundColor).toBe(
      themeServiceSpy.outerCardBackgroundColor.backgroundColor
    );
  });

  it(`In light theme, in applicationTypeComponent the div with class container that is wrapping 
  the fightCardComponent has a background color of rgb(237, 244, 248)`, () => {
    const outerBackground = applicationTypeFixture.debugElement.query(
      By.css('.container')
    ).nativeElement;
    themeServiceSpy.setDarkTheme();
    applicationTypeFixture.detectChanges();
    expect(getComputedStyle(outerBackground).backgroundColor).toBe(
      themeServiceSpy.outerCardBackgroundColor.backgroundColor
    );
    console.log(themeServiceSpy.outerCardBackgroundColor.backgroundColor);
    console.log(getComputedStyle(outerBackground).backgroundColor);
  });
});
