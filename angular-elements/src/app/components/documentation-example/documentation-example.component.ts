import { CustomElementsService } from './../../services/custom-elements.service';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { createCustomElement } from '@angular/elements';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-example',
  templateUrl: './documentation-example.component.html',
  styleUrls: ['./documentation-example.component.scss'],
})
export class DocumentationExampleComponent implements OnInit {
  constructor(
    private customElement: CustomElementsService,
    private router: Router,
    injector: Injector
  ) {
    let AlertElement = createCustomElement(AlertComponent, { injector });
    if (!customElements.get('alert-element'))
      customElements.define('alert-element', AlertElement);
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/']);
  }

  createElement(message: string) {
    this.customElement.createAlert(message);
  }
}
