import { Component, Input, AfterViewChecked, ChangeDetectorRef, ElementRef } from '@angular/core';
import { CodeList } from '../../../models/code-list';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';


@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.scss']
})
export class AreaModalComponent implements AfterViewChecked {
  codeList = CodeList;

  _model = {
    isOpen: false,
  };

  get model() {
    return this._model;
  }
  @Input()
  set model(model) {
    this._model = model;
    if(this._model.isOpen && this.utilService.isMobile()){
      this.utilService.stopBodyScroll(true);
    };
  }

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private utilService: UtilService,
    private elementRef:ElementRef
  ) {
  }

  closeModal() {
    this.model.isOpen = false;
    if(this.utilService.isMobile()){
      this.utilService.stopBodyScroll(false);
    };
  }

  overModal(event) {
    if ((this.elementRef.nativeElement.children[0] === (event.target))) {
      this.model.isOpen = false;
    }
  }

  Search(item) {
    let queryParams = {
      animal_area_pkid: item.key
    };
    this.router.navigate(['/adopt/search'], { queryParams: queryParams });
    this.closeModal();
  }

  ngAfterViewChecked() {
    this.elementRef.nativeElement.querySelector('.modal-content').scrollTop = 0;
  }

}
