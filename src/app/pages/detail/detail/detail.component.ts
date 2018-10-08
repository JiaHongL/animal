import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../feature/loading/loading.service';
import { LoadingDirective } from '../../../feature/loading/loading.directive';
import { finalize } from 'rxjs/operators';
import { AnimalService } from '../../../core/services/animal.service';
import { Animal } from '../../../models/animal';
import { PhotoModel } from '../../../shared/components/photo-modal/photo.interface';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  animals$: Observable<Animal[]>;

  @ViewChild(LoadingDirective) componentHost: LoadingDirective;

  photoModel: PhotoModel = {
    isOpen: false,
    url: ''
  };

  constructor(
    public animalService: AnimalService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private utilService:UtilService
  ) { }

  openModal(src) {
    this.photoModel.isOpen = true;
    this.photoModel.url = src;
    this.photoModel = { ...this.photoModel };
  }

  ngOnInit() {
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading02');
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.animals$ = this.animalService.getAnimalDetail(id).pipe(
      finalize(() => {
        this.loadingService.onDestroy();
      })
    );
    this.utilService.isIosNoTouch();
  }

}
