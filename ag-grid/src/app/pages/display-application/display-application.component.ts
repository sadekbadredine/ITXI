import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Application, applications } from 'src/app/mock/applicationsMockData';

@Component({
  selector: 'app-display-application',
  templateUrl: './display-application.component.html',
  styleUrls: ['./display-application.component.scss'],
})
export class DisplayApplicationComponent implements OnInit {
  @ViewChild('card') card: ElementRef<HTMLElement>;
  applications: Application[] = applications;
  cardStyle;
  isGridView: boolean = false;

  iconMargin;

  constructor() {}

  ngOnInit(): void {
    this.setStyleOnResize();
  }

  @HostListener('window:resize', ['$event'])
  setStyleOnResize($event?) {
    this.iconMargin = {
      'margin-left': `${innerWidth - 118}px`,
    };
  }

  onToggleView() {
    this.isGridView = !this.isGridView;
  }
}
