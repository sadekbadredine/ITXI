import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-user-html-input',
  templateUrl: './user-html-input.component.html',
  styleUrls: ['./user-html-input.component.scss'],
})
export class UserHtmlInputComponent implements OnInit, OnChanges {
  @Output() closeElement = new EventEmitter();
  @Input() content: string;

  sanitizedContent: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    document.getElementById('content').innerHTML = this.content;
  }

  onCloseElement() {
    this.closeElement.next();
  }
}
