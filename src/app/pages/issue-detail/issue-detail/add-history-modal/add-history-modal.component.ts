import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../../../core/services/util.service';
import { CodeList } from '../../../../models/code-list';
import { Issue, history } from '../../../../models/issues';
import { FirebaseService } from '../../../../core/services/firebase.service';

@Component({
  selector: 'app-add-history-modal',
  templateUrl: './add-history-modal.component.html',
  styleUrls: ['./add-history-modal.component.scss']
})
export class AddHistoryModalComponent implements OnInit {

  codeList = CodeList;
  form: FormGroup;

  _isOpen = {
    status: false
  };
  _model: {
    name: string;
    issue?: Issue
  } = {
      name: '',
    };

  get model() {
    return this._model;
  }
  @Input()
  set model(value) {
    this._model = value;
  }

  get isOpen() {
    return this._isOpen;
  }
  @Input()
  set isOpen(value) {
    this._isOpen = value;
    if (this._isOpen.status) {
      this.form.reset();
      this.form.setValue({
        status: 1,
        remark: ''
      });
      if (this.utilService.isMobile()) {
        this.utilService.stopBodyScroll(true);
      };
    };
  }

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private firebaseService: FirebaseService
  ) {
    this.form = this.fb.group({
      status: [1, ''],
      remark: ['', Validators.required]
    });
  }

  closeModal() {
    this.isOpen.status = false;
    if (this.utilService.isMobile()) {
      this.utilService.stopBodyScroll(false);
    };
  }

  overModal(event) {
    if ((document.getElementsByClassName('modal-wrapper add-history')[0] === (event.target))) {
      this.isOpen.status = false;
    }
  }

  addHistory() {
    let issue: Issue = { ...this.model.issue };
    let status:number = parseInt(this.form.value.status);
    issue.history = [];
    this.model.issue.history.forEach((item, index) => {
      issue.history.push({ ...item, ...this.model.issue.history[index] });
    });
    issue.status = status;
    let history: history = {
      status: status,
      createTime: new Date(),
      createUser: this.model.name,
      remark: this.form.value.remark
    };
    issue.history.push(history);
    this.firebaseService.updateIssue(issue).then((v) => {
      this.closeModal();
    }, (error) => {
      alert(error);
    });
  }

  ngOnInit() {

  }

}
