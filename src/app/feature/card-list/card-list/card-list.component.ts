import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AnimalService } from '../../../core/services/animal.service';
import { Animal } from '../../../models/animal';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  _animals: Animal[] = [];
  get animals() {
    return this._animals;
  }

  @Input('animals')
  set animals(value: Animal[]) {
    this._animals = value;
  }

  @Output() open = new EventEmitter();

  constructor(
    private animalService:AnimalService
  ) { }


  openModal(src) {
    this.open.emit(src);
  }

  setFavorite(item:Animal){
    item.isLike = !item.isLike;
    this.animalService.setFavorite(item);
  }

  ngOnInit() {
  }

}
