import { CommunicationService } from './../../services/communication.service';
import { EnfantComponent } from 'src/app/components/enfant/enfant.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-uncle',
  templateUrl: './uncle.component.html',
  styleUrls: ['./uncle.component.scss'],
})
export class UncleComponent implements OnInit {
  @ViewChild(EnfantComponent) accessChildContent: EnfantComponent;

  serverTypes = ['Test Server', 'Production Server', 'Development Server'];
  form: FormGroup;

  constructor(private communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      serverName: new FormControl('', Validators.required),
      serverType: new FormControl('', Validators.required),
    });
  }

  accessChild() {
    this.accessChildContent.changeContent();
  }

  onSubmit() {
    this.communicationService.serverData.next(this.form.value);
  }
}
