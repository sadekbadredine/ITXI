import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() selectedTheme: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() themes: Array<string>;
  @Input() message: string ;

  themeForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.themeForm = new FormGroup({
      theme: new FormControl('', Validators.required),
    });
  }

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.selectedTheme.emit(this.themeForm.value.theme);
    this.closeModal.emit();
  }
}
