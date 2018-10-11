import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  closeModal() {
    this.model.isOpen = false;
    this.model.remark = '';
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper remark')[0] === (event.target))) {
      this.model.isOpen = false;
      this.model.remark = '';
    }
  }

  ngOnInit() {
  }
}
