import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { UserHtmlInputComponent } from '../components/user-html-input/user-html-input.component';

@Injectable({
  providedIn: 'root',
})
export class CustomElementsService {
  constructor() {}

  createAlert(message: string) {
    const alertElement: NgElement &
      WithProperties<AlertComponent> = document.createElement(
      'alert-element'
    ) as any;
    document.body.appendChild(alertElement);
    alertElement.message = message;
    alertElement.addEventListener('closeAlert', () =>
      document.body.removeChild(alertElement)
    );
  }

  createUserInput(content: string) {
    const userHtmlInputElement: NgElement &
      WithProperties<UserHtmlInputComponent> = document.createElement(
      'user-html-input-element'
    ) as any;
    document.body.appendChild(userHtmlInputElement);
    userHtmlInputElement.content = content;
    userHtmlInputElement.addEventListener('closeElement', () =>
      document.body.removeChild(userHtmlInputElement)
    );
  }
}
