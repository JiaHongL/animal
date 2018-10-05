import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeList } from '../../../models/code-list';
import { Router } from '@angular/router';


@Component({
  selector: 'app-condition-modal',
  templateUrl: './condition-modal.component.html',
  styleUrls: ['./condition-modal.component.scss']
})
export class ConditionModalComponent implements OnInit {
  codeList = CodeList;
  form: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.form = this.fb.group({
      animal_kind: ['', ''],
      animal_sex: ['', ''],
      animal_bodytype: ['', ''],
      animal_age: ['', ''],
      animal_colour: ['', ''],
      animal_sterilization: ['', ''],
      animal_bacterin: ['', ''],
    });
  }

  closeModal() {
    this.model.isOpen = false;
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper condition')[0] === (event.target))) {
      this.model.isOpen = false;
    }
  }

  Search() {
    let queryParams = this.form.value;
    Object.keys(queryParams).forEach((objectKey, index) => {
      let value = queryParams[objectKey];
      if (value == '' || value == 'none') {
        delete queryParams[objectKey];
      }
    });
    this.ngZone.run(() => {
      this.router.navigate(['/adopt/search'], { queryParams: queryParams });
    });
    this.closeModal();
  }

  ngOnInit() {
  }
}
