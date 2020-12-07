import { UserHtmlInputComponent } from './../user-html-input/user-html-input.component';
import { CustomElementsService } from './../../services/custom-elements.service';
import { Component, OnInit, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Router } from '@angular/router';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-example',
  templateUrl: './personal-example.component.html',
  styleUrls: ['./personal-example.component.scss'],
})
export class PersonalExampleComponent implements OnInit {
  constructor(
    private customElement: CustomElementsService,
    private router: Router,
    injector: Injector
  ) {
    // we pass the injector so the element is able to connects itself to this component
    const userInputHtmlElement = createCustomElement(UserHtmlInputComponent, {
      injector,
    });
    // we check for existing custom element with the same element name we want to register
    if (!customElements.get('user-html-input-element'))
      // define allows to register the custom element with the browser
      customElements.define('user-html-input-element', userInputHtmlElement);
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/']);
  }

  inputAction(data: string) {
    this.customElement.createUserInput(data);
  }
}
