import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() alertMessage: string;
  @Output() closeAlert = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.closeAlert.emit();
  }
}
