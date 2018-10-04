import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimalService } from '../../../core/services/animal.service';
import { PhotoModel } from '../../../shared/components/photo-modal/photo.interface';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  FavoriteChangeSubscription;
  hasData = true;
  animalList = [];

  photoModel: PhotoModel = {
    isOpen: false,
    url: ''
  };


  constructor(
    private animalService: AnimalService
  ) { }

  getFavorite() {
    this.animalList = this.animalService.getFavorite();
    this.hasData = (this.animalList.length > 0) ? true : false;;
  }

  openModal(src) {
    this.photoModel.isOpen = true;
    this.photoModel.url = src;
    this.photoModel = { ...this.photoModel };
  }

  ngOnInit() {
    this.getFavorite();
    this.FavoriteChangeSubscription = this.animalService.getFavoriteChange()
      .subscribe((v) => {
        this.getFavorite();
      });
  }

  ngOnDestroy() {
    this.FavoriteChangeSubscription.unsubscribe();
  }

}
