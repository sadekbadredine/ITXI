import { ThemeManagementService } from 'src/app/services/theme-management.service';
import { ThemeManagementServiceSpy } from './ThemeManagementServiceSpy';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/modules/material.module';
import { FlightCardComponent } from './flight-card.component';
import { By } from '@angular/platform-browser';

describe('FlightCardComponent', () => {
  let fixture: ComponentFixture<FlightCardComponent>;
  let themeServiceSpy: ThemeManagementService;
  let component: FlightCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightCardComponent],
      imports: [MaterialModule],
      providers: [
        {
          provide: ThemeManagementService,
          useClass: ThemeManagementServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCardComponent);
    themeServiceSpy = fixture.debugElement.injector.get(ThemeManagementService);
    component = fixture.componentInstance;
    component.logo = 'assets/emirates-airlines.png';
    component.pendingCount = 1;
    component.approvedCount = 1;
    component.rejectedCount = 1;
    component.questionCount = 1;
    component.examineCount = 1;
    component.quarantineCount = 100000;
    component.title = 'T1 123';
    component.subtitle = '1/1/2020';
    fixture.detectChanges();
  });

  it('The airline logo should have logo should have border radius 50%', () => {
    const img = fixture.debugElement.query(By.css('.img')).nativeElement;
    expect(getComputedStyle(img).borderRadius).toBe('50%');
  });

  it(`the title and the subtitle must be in a div with an id applicationCountHeaderTitle style 
  display flex and flex direction column`, () => {
    const applicationCountHeaderTitle = fixture.debugElement.query(
      By.css('#applicationCountHeaderTitle')
    ).nativeElement;
    expect(applicationCountHeaderTitle).toBeDefined();
    expect(getComputedStyle(applicationCountHeaderTitle).display).toBe('flex');
    expect(getComputedStyle(applicationCountHeaderTitle).flexDirection).toBe(
      'column'
    );
  });

  it(`The total pax number must be inside svg that has a rectangle with rounded border 7 and the 
  provided people icon is an svg`, () => {
    const svg = fixture.debugElement.query(By.css('svg>rect')).attributes;
    const logo = fixture.debugElement.query(By.css('svg>svg')).attributes;
    expect(svg.rx).toBe('7');
    expect(logo.id).toBe('person');
  });

  it(`the div wrapping the airline logo and the title and the subtitle has style display flex and 
  flex direction row and id applicationCountHeader and it is inside mat-card-header`, () => {
    const matCardHeader = fixture.debugElement.queryAll(
      By.css('mat-card-header>div')
    );
    const applicationCountHeader = fixture.debugElement.query(
      By.css('#applicationCountHeader')
    ).nativeElement;
    expect(getComputedStyle(applicationCountHeader).display).toBe('flex');
    expect(getComputedStyle(applicationCountHeader).flexDirection).toBe('row');
    expect(matCardHeader[1].attributes.id).toBe('applicationCountHeader');
  });

  it(`The div wrapping the applicationTypeCount is inside mat-card-content and has style of display 
  flex and flex-direction row  and id applicationTypeCountBody and has two div each one has style of 
  display flex and flex-direction column`, () => {
    const matCardContent = fixture.debugElement.queryAll(
      By.css('mat-card-content>div')
    );
    const applicationTypeCountBody = fixture.debugElement.query(
      By.css('#applicationTypeCountBody')
    ).nativeElement;
    const applicationTypeCountBodyContent = fixture.debugElement.queryAll(
      By.css('div.column')
    );
    expect(matCardContent[0].attributes.id).toBe('applicationTypeCountBody');
    expect(getComputedStyle(applicationTypeCountBody).display).toBe('flex');
    expect(getComputedStyle(applicationTypeCountBody).flexDirection).toBe(
      'row'
    );
    expect(applicationTypeCountBodyContent.length).toBe(2);
    expect(
      getComputedStyle(applicationTypeCountBodyContent[0].nativeElement).display
    ).toBe('flex');
    expect(
      getComputedStyle(applicationTypeCountBodyContent[0].nativeElement)
        .flexDirection
    ).toBe('column');
    expect(
      getComputedStyle(applicationTypeCountBodyContent[1].nativeElement).display
    ).toBe('flex');
    expect(
      getComputedStyle(applicationTypeCountBodyContent[1].nativeElement)
        .flexDirection
    ).toBe('column');
  });

  it(`Each div of the applicationTypeCount has a list of three items and each item is an object of key 
  value pair where the key is the applicationType and the value is the applicaionCounts and the key is 
  after the value`, () => {
    const applicationTypeCountBodyContent = fixture.debugElement.queryAll(
      By.css('div.column')
    );
    expect(
      applicationTypeCountBodyContent[0].queryAll(By.css('div')).length
    ).toBe(3);
    expect(
      applicationTypeCountBodyContent[1].queryAll(By.css('div')).length
    ).toBe(3);
    expect(
      applicationTypeCountBodyContent[0].queryAll(By.css('div'))[0]
        .nativeElement.textContent
    ).toBe(' ' + component.pendingCount + '  Pending ');
    expect(
      applicationTypeCountBodyContent[0].queryAll(By.css('div'))[1]
        .nativeElement.textContent
    ).toBe(' ' + component.approvedCount + '  Approved ');
    expect(
      applicationTypeCountBodyContent[0].queryAll(By.css('div'))[2]
        .nativeElement.textContent
    ).toBe(' ' + component.rejectedCount + '  Rejected ');
    expect(
      applicationTypeCountBodyContent[1].queryAll(By.css('div'))[0]
        .nativeElement.textContent
    ).toBe(' ' + component.questionCount + '  Question ');
    expect(
      applicationTypeCountBodyContent[1].queryAll(By.css('div'))[1]
        .nativeElement.textContent
    ).toBe(' ' + component.examineCount + '  Examine ');
    expect(
      applicationTypeCountBodyContent[1].queryAll(By.css('div'))[2]
        .nativeElement.textContent
    ).toBe(' ' + component.quarantineCount + '  Quarantine ');
  });

  it(`Each applicationCount of the item of each list has a rounded border rectangle svg with a style fill depending on the applicationType where 
  TotalPax:  rgb(239,239,239),
  Pending : rgb(239,239,239),
  Approved: rgb(141,195,140),
  Rejected: rgb(161,21,240),
  Examine: rgb(255,153,52),
  Question: rgb(255,216,117),
  Quarantine: rgb(254,0,23)`, () => {
    const applicationCount = fixture.debugElement.queryAll(
      By.css('div.column')
    );
    expect(
      applicationCount[0].query(By.css('rect')).attributes.rx
    ).toBeGreaterThan(0);
    expect(
      getComputedStyle(
        applicationCount[0].queryAll(By.css('rect'))[0].nativeElement
      ).fill
    ).toBe('rgb(239, 239, 239)');
    expect(
      getComputedStyle(
        applicationCount[0].queryAll(By.css('rect'))[1].nativeElement
      ).fill
    ).toBe('rgb(141, 195, 140)');
    expect(
      getComputedStyle(
        applicationCount[0].queryAll(By.css('rect'))[2].nativeElement
      ).fill
    ).toBe('rgb(161, 21, 240)');
    expect(
      getComputedStyle(
        applicationCount[1].queryAll(By.css('rect'))[0].nativeElement
      ).fill
    ).toBe('rgb(255, 216, 117)');
    expect(
      getComputedStyle(
        applicationCount[1].queryAll(By.css('rect'))[1].nativeElement
      ).fill
    ).toBe('rgb(255, 153, 52)');
    expect(
      getComputedStyle(
        applicationCount[1].queryAll(By.css('rect'))[2].nativeElement
      ).fill
    ).toBe('rgb(254, 0, 23)');
  });

  it(`Mat-card-header and mat-card-content are inside mat-card element 
  where mat-card-header is above mat-card-content`, () => {
    const matCard = fixture.debugElement.query(By.css('mat-card'));
    const matCardHeader = matCard.query(By.css('mat-card-header'));
    const matCardContent = matCard.query(By.css('mat-card-content'));
    expect(matCard).toBeDefined();
    expect(matCardHeader).toBeDefined();
    expect(matCardContent).toBeDefined();
    expect(matCard.nativeElement.firstChild.className).toBe('mat-card-header');
    expect(matCard.nativeElement.lastChild.className).toBe('mat-card-content');
  });

  it(`The value of the totalPaxCount must be the sum of the pendingCount and approvedCount and 
  rejectedCount and examineCount and questionCount and quarantineCount`, () => {
    const totalPaxCount = fixture.debugElement.query(
      By.css('#totalPax>svg>text')
    ).nativeElement.textContent;
    const applicationCountSum =
      component.pendingCount +
      component.approvedCount +
      component.rejectedCount +
      component.examineCount +
      component.questionCount +
      component.quarantineCount;
    expect(totalPaxCount).toBe(' ' + applicationCountSum + ' ');
  });

  it(`The mat-card is inside a component called  FlightCardComponent 
  with bound input properties pendingCount, approvedCount, rejectedCount, examineCount, 
  questionCount, quarantineCount`, () => {
    const flightCardComponent = fixture.componentInstance;
    const matCard = fixture.debugElement.query(By.css('mat-card'))
      .nativeElement;
    expect(flightCardComponent).toBeTruthy();
    expect(matCard).toBeDefined();
    expect(flightCardComponent.approvedCount).toBeDefined();
    expect(flightCardComponent.pendingCount).toBeDefined();
    expect(flightCardComponent.rejectedCount).toBeDefined();
    expect(flightCardComponent.examineCount).toBeDefined();
    expect(flightCardComponent.questionCount).toBeDefined();
    expect(flightCardComponent.quarantineCount).toBeDefined();
  });

  it(`In Dark theme, dark button in FlightCardComponent should fire setAppDarkTheme() 
  function that fires setDarkTheme from ThemeManagementService  that sets the card color to 
  rgb(128,128,128) and card content text color should be rgb(255, 255, 255) and light button color 
  should be rgb(128,128,128) with rgb(255, 255, 255) text color and dark button color should be 
  rgb(211,211,211) with rgb(0, 0, 0) text`, () => {
    const card = fixture.debugElement.query(By.css('.mat-card')).nativeElement;
    const cardHeaderTitle = fixture.debugElement.queryAll(
      By.css('#applicationCountHeaderTitle>div')
    )[0].nativeElement;
    const count = fixture.debugElement
      .queryAll(By.css('div.column'))[0]
      .queryAll(By.css('div'))[0]
      .queryAll(By.css('svg'))[0]
      .queryAll(By.css('text'))[1].nativeElement;
    const darkButton = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement;
    const lightButton = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;

    fixture.debugElement
      .queryAll(By.css('button'))[0]
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.setAppDarkTheme).toHaveBeenCalled;
    expect(themeServiceSpy.setDarkTheme).toHaveBeenCalled;
    expect(getComputedStyle(card).backgroundColor).toBe(
      themeServiceSpy.cardBackgroundColor['background-color']
    );
    expect(getComputedStyle(cardHeaderTitle).color).toBe(
      themeServiceSpy.cardHeaderTextColor.color
    );
    expect(getComputedStyle(count).fill).toBe(themeServiceSpy.countTextColor);
    expect(getComputedStyle(lightButton).backgroundColor).toBe(
      themeServiceSpy.lightButtonColor.backgroundColor
    );
    expect(getComputedStyle(lightButton).color).toBe(
      themeServiceSpy.lightButtonColor.color
    );
    expect(getComputedStyle(darkButton).backgroundColor).toBe(
      themeServiceSpy.darkButtonColor.backgroundColor
    );
    expect(getComputedStyle(darkButton).color).toBe(
      themeServiceSpy.darkButtonColor.color
    );
  });

  it(`In light theme, light button in FlightCardComponent should fire setAppLightTheme() function that 
  fires setLightTheme from ThemeManagementService that sets the card color to rgb(255, 255, 255) and card content 
  text color should be rgb(0, 0, 0) and light button color should be rgb(211, 211, 211) with rgb(0, 0, 0) text color 
  and dark button color should be rgb(128,128,128) with rgb(255, 255, 255) text`, () => {
    const card = fixture.debugElement.query(By.css('.mat-card')).nativeElement;
    const cardHeaderTitle = fixture.debugElement.queryAll(
      By.css('#applicationCountHeaderTitle>div')
    )[0].nativeElement;
    const count = fixture.debugElement
      .queryAll(By.css('div.column'))[0]
      .queryAll(By.css('div'))[0]
      .queryAll(By.css('svg'))[0]
      .queryAll(By.css('text'))[1].nativeElement;
    const darkButton = fixture.debugElement.queryAll(By.css('button'))[0]
      .nativeElement;
    const lightButton = fixture.debugElement.queryAll(By.css('button'))[1]
      .nativeElement;

    fixture.debugElement
      .queryAll(By.css('button'))[1]
      .triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.setAppLightTheme).toHaveBeenCalled;
    expect(themeServiceSpy.setLightTheme).toHaveBeenCalled;
    expect(getComputedStyle(card).backgroundColor).toBe(
      themeServiceSpy.cardBackgroundColor['background-color']
    );
    expect(getComputedStyle(cardHeaderTitle).color).toBe(
      themeServiceSpy.cardHeaderTextColor.color
    );
    expect(getComputedStyle(count).fill).toBe(themeServiceSpy.countTextColor);
    expect(getComputedStyle(lightButton).backgroundColor).toBe(
      themeServiceSpy.lightButtonColor.backgroundColor
    );
    expect(getComputedStyle(lightButton).color).toBe(
      themeServiceSpy.lightButtonColor.color
    );
    expect(getComputedStyle(darkButton).backgroundColor).toBe(
      themeServiceSpy.darkButtonColor.backgroundColor
    );
    expect(getComputedStyle(darkButton).color).toBe(
      themeServiceSpy.darkButtonColor.color
    );
  });

  it(`Person logo's axis should be 125 if totalPaxCount = 0 
        and should be 113 if totalPaxCount > 0 && < 9 
        and should be 110 if totalPaxCount > 9 && < 99 
        and should be 107 if totalPaxCount > 99 && < 999 
        and should be 105 if totalPaxCount > 999 && < 9999 
        and should be 102 if totalPaxCount > 9999 && < 99999 
        and should be 100 if totalPaxCount > 999999`, () => {
    const logo = fixture.debugElement.query(By.css('#person')).nativeElement;
    if (component.totalPax == 0) expect(logo.attributes.x.value).toBe('125');
    if (component.totalPax > 0 && component.totalPax < 9)
      expect(logo.attributes.x.value).toBe('113');
    if (component.totalPax > 9 && component.totalPax < 99)
      expect(logo.attributes.x.value).toBe('110');
    if (component.totalPax > 99 && component.totalPax < 999)
      expect(logo.attributes.x.value).toBe('107');
    if (component.totalPax > 999 && component.totalPax < 9999)
      expect(logo.attributes.x.value).toBe('105');
    if (component.totalPax > 9999 && component.totalPax < 99999)
      expect(logo.attributes.x.value).toBe('102');
    if (component.totalPax > 99999) expect(logo.attributes.x.value).toBe('100');
  });

  it(`totalPaxCount's text axis should be 153 if totalPaxCount > 0 & < 9 
        and should be 145 if totalPaxCount > 9 && < 99 
        and should be 140 if totalPaxCount > 99 && < 999 
        and should be 138 if totalPaxCount > 999 && < 9999 
        and should be 135 if totalPaxCount > 9999 && < 99999 
        and should be 131 if totalPaxCount > 999999`, () => {
    const totalPaxText = fixture.debugElement.query(By.css('#totalPaxText'))
      .nativeElement;
    if (component.totalPax > 0 && component.totalPax < 9)
      expect(totalPaxText.attributes.x.value).toBe('153');
    if (component.totalPax > 9 && component.totalPax < 99)
      expect(totalPaxText.attributes.x.value).toBe('145');
    if (component.totalPax > 99 && component.totalPax < 999)
      expect(totalPaxText.attributes.x.value).toBe('140');
    if (component.totalPax > 999 && component.totalPax < 9999)
      expect(totalPaxText.attributes.x.value).toBe('138');
    if (component.totalPax > 9999 && component.totalPax < 99999)
      expect(totalPaxText.attributes.x.value).toBe('135');
    if (component.totalPax > 99999)
      expect(totalPaxText.attributes.x.value).toBe('131');
  });

  it(`All application text axis should be 20 if applicationCount > 0 & < 9 
        and should be 14 if applicationCount > 9 && < 99 
        and should be 10 if applicationCount > 99 && < 999 
        and should be 5 if applicationCount > 999 && < 9999 
        and should be 3 if applicationCount > 9999 && < 99999`, () => {
    const anyApplicationCount = fixture.debugElement
      .query(By.css('.column>div>svg'))
      .queryAll(By.css('text'))[0].nativeElement;
    if (component.totalPax > 0 && component.pendingCount < 9)
      expect(anyApplicationCount.attributes.x.value).toBe('20');
    if (component.pendingCount > 9 && component.pendingCount < 99)
      expect(anyApplicationCount.attributes.x.value).toBe('14');
    if (component.pendingCount > 99 && component.pendingCount < 999)
      expect(anyApplicationCount.attributes.x.value).toBe('10');
    if (component.pendingCount > 999 && component.pendingCount < 9999)
      expect(anyApplicationCount.attributes.x.value).toBe('5');
    if (component.pendingCount > 9999 && component.pendingCount < 99999)
      expect(anyApplicationCount.attributes.x.value).toBe('3');
  });

  it(`All application count font size should be 20px if applicationCount > 0 & < 9 
        and should be 20px if applicationCount > 9 && < 99 
        and should be 20px if applicationCount > 99 && < 999 
        and should be 19px if applicationCount > 999 && < 9999 
        and should be 17px if applicationCount > 9999 && < 99999`, () => {
    const anyApplicationCount = fixture.debugElement
      .query(By.css('.column>div>svg'))
      .queryAll(By.css('text'))[0].nativeElement;
    console.log(getComputedStyle(anyApplicationCount).fontSize);
    if (component.totalPax > 0 && component.pendingCount < 9)
      expect(getComputedStyle(anyApplicationCount).fontSize).toBe('20px');
    if (component.pendingCount > 9 && component.pendingCount < 99)
      expect(getComputedStyle(anyApplicationCount).fontSize).toBe('20px');
    if (component.pendingCount > 99 && component.pendingCount < 999)
      expect(getComputedStyle(anyApplicationCount).fontSize).toBe('20px');
    if (component.pendingCount > 999 && component.pendingCount < 9999)
      expect(getComputedStyle(anyApplicationCount).fontSize).toBe('19px');
    if (component.pendingCount > 9999 && component.pendingCount < 99999)
      expect(getComputedStyle(anyApplicationCount).fontSize).toBe('17px');
  });

  it(`The badge of an application count should be shown only if the value of the 
  application is grater than 0`, () => {
    const applicationCountBadge = fixture.debugElement
      .queryAll(By.css('div.column'))[0]
      .query(By.css('rect'));
    const applicationCountValue = fixture.debugElement
      .queryAll(By.css('div.column'))[0]
      .query(By.css('div>svg'))
      .queryAll(By.css('text'))[0].nativeElement;
    expect(applicationCountValue.textContent).toBeGreaterThan(0);
    expect(applicationCountBadge).toBeDefined();
  });
});
