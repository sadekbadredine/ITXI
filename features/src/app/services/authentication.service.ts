import { DomPositionDirective } from 'src/app/directives/dom-position.directive';
import { DynamicComponentsService } from './dynamic-components.service';
import { User, userMockData } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  modalDomPosition: DomPositionDirective;
  userData: User[] = userMockData;

  constructor(
    private dynamicComponentsService: DynamicComponentsService,
    private router: Router
  ) {}

  userAuthentication(
    newUsername: string,
    newPassword: string,
    loginMode: boolean,
    modalDomPosition: DomPositionDirective
  ) {
    this.modalDomPosition = modalDomPosition;
    if (loginMode) {
      if(!this.findUser(newUsername)) this.logInAction(false, null)
      else  this.logInAction(true, newUsername);
    }else {
      if(this.findUser(newUsername)) this.signUpAction(false, null, null);
      else  this.signUpAction(true, newUsername, newPassword);
    }
  }

  findUser(newUsername: string){
   if( this.userData.find((userData)=> userData.username === newUsername) ) return true;
  }

  logInAction(result: boolean, username: string) {
    if (result) {
      this.router.navigate([`/home/${username}`]);
    }
    if (!result) {
      this.dynamicComponentsService.createModal(
        this.modalDomPosition,
        null,
        "Username doesn't exist, Sign up Instead")
    }
  }

  signUpAction(result: boolean, newUsername: string, newPassword: string) {
    let newUser: User = { username: newUsername, password: newPassword };
    if (result) {
      this.router.navigate([`/home/${newUsername}`]);
      this.userData.push(newUser);
    }
    if (!result) {

      this.dynamicComponentsService.createModal(
        this.modalDomPosition,
        null,
        "Username exists, Log In Instead")
    }
  }
}
