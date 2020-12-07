import { DataStorageService } from './../../services/data-storage.service';
import { DropDownDirective } from 'src/app/directives/dropdown.directive';
import { asyncData } from 'src/app/testing/async.observable';
import { ApiService } from './../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { carMockData } from './../../mock/carMockData';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { delay, take } from 'rxjs/operators';
import { interval, of } from 'rxjs';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  waitForAsync,
  tick,
} from '@angular/core/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let apiService: ApiService;
  let dataStorageService: DataStorageService;
  let httpClientSpy: { get: jasmine.Spy; put: jasmine.Spy };
  let directiveElements: DebugElement[];
  let directiveElement: DropDownDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HeaderComponent, DropDownDirective],
      providers: [ApiService, DataStorageService],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    apiService = new ApiService(dataStorageService, httpClientSpy as any);
    dataStorageService = TestBed.inject(DataStorageService);
  });

  it('should create app', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should toggle dropdown menu on user clicks', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    directiveElements = fixture.debugElement.queryAll(
      By.directive(DropDownDirective)
    );
    directiveElement = directiveElements[0].injector.get(
      DropDownDirective
    ) as DropDownDirective;
    let dropdownElement = fixture.debugElement.nativeElement.querySelector(
      'li'
    );
    dropdownElement.click();
    fixture.detectChanges();
    expect(directiveElement.isOpen).toBeTruthy();
    dropdownElement.click();
    fixture.detectChanges();
    expect(directiveElement.isOpen).toBeFalse();
  });

  it('#onSaveData should call storeCars from the ApiService', () => {
    fixture = TestBed.createComponent(HeaderComponent);
    httpClientSpy.put.and.returnValue(asyncData(carMockData));
    component = fixture.componentInstance;
    component.onSaveData();
    fixture.detectChanges();
    apiService.storeCars(carMockData).subscribe((cars) => {
      expect(cars).toEqual(carMockData);
      expect(httpClientSpy.put.calls.count()).toBe(1);
    }, fail);
  });

  it(
    '#onFetchData should call fetchCars from the ApiService with waitForAsync()',
    waitForAsync(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      apiService = fixture.debugElement.injector.get(ApiService);
      httpClientSpy.put.and.returnValue(asyncData(carMockData));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(dataStorageService.cars).toBe(carMockData);
      });
    })
  );

  it('#onFetchData should call fetchCars from the ApiService with fakeAsync()and tick()', fakeAsync(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    apiService = fixture.debugElement.injector.get(ApiService);
    httpClientSpy.put.and.returnValue(asyncData(carMockData));
    fixture.detectChanges();
    tick();
    expect(dataStorageService.cars).toBe(carMockData);
  }));

  it('should run timeout callback with delay after call tick with milliseconds', fakeAsync(() => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    tick(100);
    expect(called).toBe(true);
  }));

  it('should get Date difference correctly in fakeAsync with rxjs scheduler', fakeAsync(() => {
    let result = null;
    of('hello')
      .pipe(delay(1000))
      .subscribe((v) => {
        result = v;
      });
    expect(result).toBeNull();
    tick(1000);
    expect(result).toBe('hello');

    const start = new Date().getTime();
    let dateDifference = 0;
    interval(1000)
      .pipe(take(2))
      .subscribe(() => (dateDifference = new Date().getTime() - start));

    tick(1000);
    expect(dateDifference).toBe(1000);
    tick(1000);
    expect(dateDifference).toBe(2000);
  }));
});

describe('use jasmine.clock()', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should auto enter fakeAsync', () => {
    let called = false;
    setTimeout(() => {
      called = true;
    }, 100);
    jasmine.clock().tick(100);
    expect(called).toBe(true);
  });
});
