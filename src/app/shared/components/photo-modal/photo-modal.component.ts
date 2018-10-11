import { Component, OnInit, Input, ElementRef } from '@angular/core';
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
  set model(model: PhotoModel) {
    this._model = model;
  }

  constructor(
    private elementRef: ElementRef
  ) { }

  closeModal() {
    this.model.isOpen = false;
    this.model.url = '';
  }

  overModal(event) {
    if ((this.elementRef.nativeElement.children[0] === (event.target))) {
      this.model.isOpen = false;
      this.model.url = '';
    }
  }

  ngOnInit() {
  }

}
