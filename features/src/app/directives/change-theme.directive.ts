import {
  SimpleChanges,
  HostBinding,
  Directive,
  OnChanges,
  Input,
} from '@angular/core';
@Directive({
  selector: '[appChangeTheme]',
})
export class ChangeThemeDirective implements OnChanges {
  @HostBinding('class') theme: string;
  @Input() selectedTheme: string;

  ngOnChanges(changes: SimpleChanges) {
    this.theme = changes.selectedTheme.currentValue;
  }
}
