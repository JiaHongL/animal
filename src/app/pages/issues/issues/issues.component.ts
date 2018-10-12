import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';
import { tap, map } from 'rxjs/operators';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  queryStatus = -1;

  pages = [];

  issues$

  constructor(
    public firebaseService: FirebaseService
  ) {
  }

  setCurrentPage(v) {
    this.currentPage = v;
  }

  setQueryStatus(v) {
    this.queryStatus = v;
    this.currentPage = 1;
    this.firebaseService.getIssues(this.queryStatus).subscribe((v) => {
      this.totalItems = v.total;
      this.pages = v.pages;
    });

  }

  ngOnInit() {
    this.setQueryStatus(-1);
  }

}
