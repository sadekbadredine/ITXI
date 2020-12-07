import { DynamicComponentsService } from 'src/app/services/dynamic-components.service';
import { DomPositionDirective } from 'src/app/directives/dom-position.directive';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export type user = {
  name: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(DomPositionDirective) modalDomPosition: DomPositionDirective;
  themes = ['red-theme', 'orange-theme', 'blue-theme', 'green-theme'];
  routeParamsSubscription: Subscription;
  themeSubscription: Subscription;
  theme: string = 'red-theme';
  user: user = { name: '' };
  loginTime = new Date();

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeParamsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.name = params['username'];
      }
    );
  }

  ngOnInit(): void {}

  getSrc() {
    switch (this.theme) {
      case 'red-theme':
        return '/assets/wallpapers/angularRed.png';
      case 'orange-theme':
        return '/assets/wallpapers/angularOrange.png';
      case 'blue-theme':
        return '/assets/wallpapers/angularBlue.png';
      case 'green-theme':
        return '/assets/wallpapers/angularGreen.png';
      default:
        return '/assets/wallpapers/angularRed.png';
    }
  }

  logOut() {
    this.router.navigate(['']);
  }

  changeTheme() {
    this.dynamicComponentsService.createModal(this.modalDomPosition, this.themes);
    this.themeSubscription = this.dynamicComponentsService.selectedTheme.subscribe(
      (theme) => {
        this.theme = theme;console.log(this.themeSubscription);
      }
    );
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
