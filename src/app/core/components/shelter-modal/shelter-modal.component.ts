import { Component, Input, AfterViewChecked } from '@angular/core';
import { CodeList } from '../../../models/code-list';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shelter-modal',
  templateUrl: './shelter-modal.component.html',
  styleUrls: ['./shelter-modal.component.scss']
})
export class ShelterModalComponent implements AfterViewChecked {
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
  }

  constructor(private router: Router) { 
  }

  closeModal() {
    this.model.isOpen = false;
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper shelter')[0] === (event.target))) {
      this.model.isOpen = false;
    }
  }

  Search(item) {
    let queryParams = {
      animal_shelter_pkid: item.key
    };
    this.router.navigate(['/adopt/search'], { queryParams: queryParams });
    this.closeModal();
  }

  ngAfterViewChecked(){
    document.querySelectorAll('.shelter .modal-content')[0].scrollTop = 0;
  }

}
