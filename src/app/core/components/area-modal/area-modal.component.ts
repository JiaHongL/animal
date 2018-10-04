import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CodeList } from '../../../models/code-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.scss']
})
export class AreaModalComponent implements  AfterViewChecked{
  codeList = CodeList;

  _model = {
    isOpen: true,
  };

  get model() {
    return this._model;
  }
  @Input()
  set model(model) {
    this._model = model; 
    document.querySelector('body').classList.add("no-scroll");
  }

  constructor(private router: Router,private changeDetectorRef:ChangeDetectorRef) {
  }

  closeModal() {
    this.model.isOpen = false;
    document.querySelector('body').classList.remove("no-scroll");
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper area')[0] === (event.target))) {
      this.model.isOpen = false;
      document.querySelector('body').classList.remove("no-scroll");
    }
  }

  Search(item) {
    let queryParams = {
      animal_area_pkid: item.key
    };
    this.router.navigate(['/adopt/search'], { queryParams: queryParams });
    this.closeModal();
  }

  ngAfterViewChecked(){
    document.querySelectorAll('.area .modal-content')[0].scrollTop = 0;
  }

}
