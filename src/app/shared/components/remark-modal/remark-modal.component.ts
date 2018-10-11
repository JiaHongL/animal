import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-remark-modal',
  templateUrl: './remark-modal.component.html',
  styleUrls: ['./remark-modal.component.scss']
})
export class RemarkModalComponent implements OnInit {

  _model = {
    isOpen: false,
    remark: ''
  };

  get model() {
    return this._model;
  }
  @Input()
  set model(model) {
    this._model = model;
  }

  constructor(
    private elementRef:ElementRef
  ) { }

  closeModal() {
    this.model.isOpen = false;
    this.model.remark = '';
  }

  overModal(event) {
    if ((this.elementRef.nativeElement.children[0] === (event.target))) {
      this.model.isOpen = false;
      this.model.remark = '';
    }
  }

  ngOnInit() {
  }
}
