import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enfant',
  templateUrl: './enfant.component.html',
  styleUrls: ['./enfant.component.scss'],
})
export class EnfantComponent implements OnInit {
  myValue = 'enfant';
  content =
    "Hi, I'm the enfant component , and My parent component is Uncle component ,and I have some values to show if you click My parent's button (Access with local reference) above, and It can access my data with a local reference on my selector in its template!";

  constructor() {}

  ngOnInit(): void {}

  changeMe() {
    this.content = 'I love working with ITXI Team';
  }

  changeContent() {
    this.content =
      "My Content was changed also from within my parent component, but this time it accessed it with @ViewChild() approach, by passing my component's name to it as an argument";
  }
}
