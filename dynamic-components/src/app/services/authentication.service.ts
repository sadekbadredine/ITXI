import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: User[] = [
    { email: 'sadek', password: 'asd' },
    { email: 'ahmad', password: 'asd' },
    { email: 'hassan', password: 'asd' },
  ];

  constructor() {}

  getUserData() {
    return this.userData;
  }

  setUserData(newUserData: User) {
    this.userData.push(newUserData);
  }
}
