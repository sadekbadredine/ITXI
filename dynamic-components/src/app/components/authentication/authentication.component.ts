import { DomPositionDirective } from 'src/app/directives/dom-position.directive';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';
import { User } from './../../models/user.model';
import {
  ComponentFactoryResolver,
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  @ViewChild(DomPositionDirective) alertDomPosition: DomPositionDirective;

  authenticationForm: FormGroup;
  emailExists: boolean;
  alertMessage: string;
  userData: User[];
  login = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.userData = this.authenticationService.getUserData();
    console.log(this.userData);
  }

  switchAuthenticationMode() {
    this.login = !this.login;
  }

  submit() {
    this.onSubmit;
  }

  onSubmit() {
    let newEmail = this.authenticationForm.value.email;
    if (!this.login) {
      // login
      const userData = this.userData;
      for (const key in userData) {
        let email = userData[key].email;
        if (newEmail == email) {
          this.logInAction(true);
          break;
        }
      }
      // end of loop
      if (this.emailExists == undefined) {
        this.logInAction(false);
      }
    } else {
      // sign up
      const userData = this.userData;
      for (const key in userData) {
        let email = userData[key].email;
        if (newEmail == email) {
          this.signUpAction(false);
          break;
        }
      }
      // end of loop
      if (this.emailExists == undefined) {
        this.signUpAction(true);
      }
    }
  }
  ////////////////// END OF SUBMIT ////////////////////////
  logInAction(result: boolean) {
    if (result) {
      console.log('login succeed');
      this.emailExists = false;
    }
    if (!result) this.showAlertMessage("Email doesn't exist, Sign up Instead");
  }

  signUpAction(result: boolean) {
    let newPassword: string = this.authenticationForm.value.password;
    let newEmail: string = this.authenticationForm.value.email;

    let newUser: User = { email: newEmail, password: newPassword };

    if (!result) {
      this.emailExists = true;
      this.showAlertMessage('Email exists, Log In Instead');
    }

    if (result) {
      this.authenticationService.setUserData(newUser);
      this.authenticationForm.reset();
    }
  }
  //////////////// END OF AUTHENTICATION ////////////////////
  closeAlert() {
    this.alertMessage = null;
    this.authenticationForm.reset();
  }
  ///////////////// DYNAMIC COMPONENTS /////////////////////
  showAlertMessage(alertMessage: string) {
    // A factory for a component is a type with a single method that returns a new component instance each time it is called
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    // Now we use that factory to create component, and we wanna tell Angular where do we wanna add that component
    const viewContainerRefDomPosition = this.alertDomPosition.viewContainerRef;
    // we clear everything from ng-template that had been rendered before
    viewContainerRefDomPosition.clear();
    // Now we create a component there, and we store it in a constant so we can work with if we wanna pass data to it
    // or listen to events
    const componentReference = viewContainerRefDomPosition.createComponent(
      alertComponentFactory
    );
    // instance method have access to the instance we created of the component and therefore its properties
    componentReference.instance.alertMessage = alertMessage;
    // we can listen to
    componentReference.instance.closeAlert.subscribe(() => {
      viewContainerRefDomPosition.clear();
      this.authenticationForm.reset();
    });
  }
}
