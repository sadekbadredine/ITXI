import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

interface members {
  name: string;
}

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.scss'],
})
export class SonComponent implements OnChanges {
  @Input() stockNumberRepresentation: number;

  stockRate: number;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    let currentValue = changes.stockNumberRepresentation.currentValue;
    let previousValue = changes.stockNumberRepresentation.previousValue;
    if (!changes.stockNumberRepresentation.previousValue)
      return (this.stockRate = this.stockNumberRepresentation);
    else this.stockRate = (currentValue - previousValue) * 100;
  }
}
