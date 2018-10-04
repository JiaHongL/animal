import { Component, OnInit, Input } from '@angular/core';
import { PhotoModel } from './photo.interface';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {

  _model: PhotoModel = {
    isOpen: false,
    url: ''
  };

  get model() {
    return this._model;
  }
  @Input()
  set model(model:PhotoModel) {
    this._model = model;
  }

  constructor() { }

  closeModal() {
    this.model.isOpen = false;
    this.model.url = '';
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper photo')[0] === (event.target))) {
      this.model.isOpen = false;
      this.model.url = '';
    }
  }

  ngOnInit() {
  }

}
