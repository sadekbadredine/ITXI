import { ModalComponent } from './../modal/modal.component';
import { DomPositionDirective } from 'src/app/directives/dom-position.directive';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentsService {
  selectedTheme = new Subject<string>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  createModal(modalDomPosition: DomPositionDirective, themes?: Array<string>, message?: string){
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const viewContainerRefDomPosition = modalDomPosition.viewContainerRef;
    viewContainerRefDomPosition.clear();
    const modalReference = viewContainerRefDomPosition.createComponent(
      modalComponentFactory
    );
    modalReference.instance.themes = themes;
    modalReference.instance.message = message;
    modalReference.instance.selectedTheme.subscribe((theme: string) => {
      this.selectedTheme.next(theme);
    });
    modalReference.instance.closeModal.subscribe(()=> { 
      viewContainerRefDomPosition.clear()
    })
  }
}
