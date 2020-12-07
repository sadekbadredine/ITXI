import { DomPositionDirective } from 'src/app/directives/dom-position.directive';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(DomPositionDirective) modalDomPosition: DomPositionDirective;

  authenticationForm: FormGroup;
  loginMode: boolean = true;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  switchAuthenticationMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    this.authenticationService.userAuthentication(
      this.authenticationForm.value.username,
      this.authenticationForm.value.password,
      this.loginMode,
      this.modalDomPosition
    );
    this.authenticationForm.reset();
  }
}
