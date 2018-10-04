import { LoadingService } from './../../../feature/loading/loading.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LoadingDirective } from '../../../feature/loading/loading.directive';
import { AnimalService } from '../../../core/services/animal.service';

import { ActivatedRoute} from '@angular/router';
import { PhotoModel } from '../../../shared/components/photo-modal/photo.interface';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit {
  hasData = true;
  searchParams = '';
  currentPage = 1;
  animalList = [];

  photoModel: PhotoModel = {
    isOpen: false,
    url: ''
  };


  @ViewChild(LoadingDirective) componentHost: LoadingDirective;

  constructor(
    private animalService: AnimalService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  searchAnimal(currentPage, param) {
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading01');
    this.animalService.getAnimals(currentPage, param).subscribe((animals) => {
      this.animalList.push(...animals);
      this.loadingService.onDestroy();
      this.hasData = (this.animalList.length > 0) ? true : false;
    });
  }

  onScroll() {
    this.currentPage += 1;
    this.searchAnimal(this.currentPage, this.searchParams);

  }

  openModal(src) {
    this.photoModel.isOpen = true;
    this.photoModel.url = src;
    this.photoModel = { ...this.photoModel };
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParamMap => {
      this.hasData = true;
      this.currentPage = 1;
      this.searchParams = '';
      this.animalList = [];
      if (Object.keys(queryParamMap).length > 0) {
        Object.keys(queryParamMap).forEach((objectKey, index) => {
          this.searchParams += this.searchParams + '&' + objectKey + '=' + queryParamMap[objectKey]
        });
      };
      this.searchAnimal(this.currentPage, this.searchParams);
    });
  }

}
