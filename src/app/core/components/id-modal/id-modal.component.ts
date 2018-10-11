import { Component, OnInit, AfterViewInit, Input, NgZone, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-id-modal',
  templateUrl: './id-modal.component.html',
  styleUrls: ['./id-modal.component.scss']
})
export class IdModalComponent implements OnInit, AfterViewInit {

  form: FormGroup;

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
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private utilService:UtilService,
    private elementRef:ElementRef
  ) {
    this.form = this.fb.group({
      animal_id: ['', ''],
      animal_subid: ['', ''],
    });
    this.form.controls.animal_id.valueChanges.subscribe((v) => {
      if(v){
        this.form.controls.animal_subid.setValue('');
      };
    });
    this.form.controls.animal_subid.valueChanges.subscribe((v) => {
      if(v){
        this.form.controls.animal_id.setValue('');
      };
    });
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
