import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit {

  _model = [];

  _page = 0;

  get model() {
    return this._model;
  }
  @Input()
  set model(model) {
    this._model = model;
  }

  get page() {
    return this._page;
  }
  @Input()
  set page(model) {
    this._page = model;
  }

  constructor() {

  }

  openIssue(id) {
    window.open('#/backend/issue/' + id);
  }

  ngOnInit() {
  }

}
