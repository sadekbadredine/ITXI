import { ApplicationModule, Component, Input, OnInit } from '@angular/core';
import { Application } from 'src/app/mock/applicationsMockData';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss'],
})
export class CardComponentComponent implements OnInit {
  @Input() application: Application;
  cardClass;
  logoStyle = {
    height: '20px',

    width: '20px',
    'margin-top': '0px',
  };
  constructor() {}

  ngOnInit(): void {
    if (this.application.name.length > 24) this.cardClass = 'long-name-card';
    else this.cardClass = 'card';
  }

  setStyle(name: string) {
    if (name.length >= 24) return { 'font-size': '13px' };
  }
}
