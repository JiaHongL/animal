import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit {

  _model = [];

  get model() {
    return this._model;
  }
  @Input()
  set model(model) {
    this._model = model;
  }

  constructor() { 

  }

  openIssue(id) {
    window.open('#/backend/issue/' + id);
  }

  ngOnInit() {
  }

}
