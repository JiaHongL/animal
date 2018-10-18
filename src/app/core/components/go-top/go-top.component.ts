import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-top',
  templateUrl: './go-top.component.html',
  styleUrls: ['./go-top.component.scss']
})
export class GoTopComponent {
  _display = 'none';
  get display() {
    return this._display;
  }
  @Input()
  set display(style) {
    this._display = style;
  }

  constructor() { }

  goTop() {
    let scrollStep = -window.scrollY / (300 / 15),
      scrollInterval = setInterval(() => {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        }
        else {
          clearInterval(scrollInterval);
        };
      }, 15);
  }

}
