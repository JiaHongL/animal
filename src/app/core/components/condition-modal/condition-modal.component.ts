import { Component, OnInit, Input, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CodeList } from '../../../models/code-list';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';


@Component({
  selector: 'app-condition-modal',
  templateUrl: './condition-modal.component.html',
  styleUrls: ['./condition-modal.component.scss']
})
export class ConditionModalComponent implements OnInit, AfterViewInit {
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
    if(this._model.isOpen && this.utilService.isMobile()){
      this.utilService.stopBodyScroll(true);
    };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private utilService:UtilService,
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
    if(this.utilService.isMobile()){
      this.utilService.stopBodyScroll(false);
    };
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
  ngAfterViewInit() {
    this.form.reset();
  }
}
