import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-daughter',
  templateUrl: './daughter.component.html',
  styleUrls: ['./daughter.component.scss'],
})
export class DaughterComponent implements OnInit {
  @Output() partyStatus = new EventEmitter<{ name: string; going: string }>();
  @Input() partyAttendee: string;

  options = ['yes', 'no'];
  ngForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.ngForm = new FormGroup({
      option: new FormControl(''),
    });
  }

  onSubmit() {
    let option = this.ngForm.value.option;
    this.partyStatus.emit({
      name: this.partyAttendee,
      going: option,
    });
    this.ngForm.reset();
  }

  getRadio() {
    this.onSubmit();
  }
}
