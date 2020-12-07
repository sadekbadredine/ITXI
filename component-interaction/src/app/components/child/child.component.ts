import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  @Input() title;
  @Input() get memberName() {
    return this._memberName;
  }

  set cMember(name: string) {
    this._memberName = name || 'no_name';
  }

  private _memberName: string;
}
