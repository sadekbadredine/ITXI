import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDomPosition]',
})
export class DomPositionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
