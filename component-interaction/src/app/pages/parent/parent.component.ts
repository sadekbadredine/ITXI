import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  stockNumberRepresentation: number;
  partyAttendees = ['Hassan', 'Ahmad', 'Sadek'];
  ngForm: FormGroup;
  partyResult = [];
  title = 'ITXI';

  teamMembers = [
    { name: 'Hassan' },
    { name: 'Ahmad' },
    { name: 'Sadek' },
    { name: '' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.ngForm = new FormGroup({
      stockNumberRepresentation: new FormControl(),
    });
  }

  onSubmit() {
    this.stockNumberRepresentation = this.ngForm.controls.stockNumberRepresentation.value;
    this.ngForm.reset();
  }

  getRate() {
    this.onSubmit();
  }

  partyStatus(data: { name: string; going: string }) {
    if (data.going === 'yes') this.partyResult.push(`${data.name} is going`);
    else this.partyResult.push(`${data.name} is not going`);
  }
}
