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

  issues$

  constructor(
    public firebaseService: FirebaseService,
    private utilService:UtilService
  ) {
  }

  search(page) {
    this.issues$ = this.firebaseService.getIssues(page).pipe(
      tap((v: any) => console.log(v)),
      map((v: any) => {
        return v.map((item) => {
          return this.utilService.transformTimestampToDate(item, 'createTime');
        })
      })
    );
  }

  setCurrentPage(v) {
    this.currentPage = v;
    this.search(this.currentPage);
  }

  openIssue(id) {
    window.open('#/backend/issue/' + id);
  }

  ngOnInit() {
    this.firebaseService.getTotal().subscribe((v) => {
      this.totalItems = v.total;
      this.search(this.currentPage);
    });
  }


}
