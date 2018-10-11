import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/services/util.service';
import { FirebaseService } from '../../../core/services/firebase.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  queryStatus = 99;

  pages = [];

  issues$

  constructor(
    public firebaseService: FirebaseService,
    private utilService: UtilService
  ) {
  }

  setCurrentPage(v) {
    this.currentPage = v;
  }

  openIssue(id) {
    window.open('#/backend/issue/' + id);
  }

  ngOnInit() {
    this.firebaseService.getIssues(this.queryStatus).subscribe((v) => {
      this.totalItems = v.total;
      this.pages = v.pages;
    });
  }

}
