import { Observable } from 'rxjs/internal/Observable';
import { Issue } from './../../../models/issues';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { UtilService } from '../../../core/services/util.service';
import { LoadingService } from '../../../feature/loading/loading.service';
import { LoadingDirective } from '../../../feature/loading/loading.directive';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss'],
  host: {
    'class': 'no-touch'
  }
})
export class IssueDetailComponent implements OnInit {
  @ViewChild(LoadingDirective) componentHost: LoadingDirective;
  issueSubscription: Subscription;
  issue$: Observable<any>;

  id = '';

  addHistoryModel = {
    name: '',
    issue: {}
  }

  isOpen = {
    status: false
  };


  constructor(
    private firebaseService: FirebaseService,

    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private loadingService: LoadingService
  ) {

  }

  getIssue() {
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading02');
    this.issue$ = this.firebaseService.getIssue(this.id).pipe(
      tap((issue: [Issue]) => {
        this.addHistoryModel.issue = issue[0];
      }),
      map((v: [Issue]) => {
        let issue: Issue = v[0];
        this.utilService.transformTimestampToDate(issue, 'createTime');
        issue.history.forEach(v => {
          this.utilService.transformTimestampToDate(v, 'createTime');
        });
        return issue;
      }),
      tap(() => {
        this.loadingService.onDestroy();
      })
    );
  }

  openModal() {
    this.isOpen = { ...this.isOpen, ...{ status: true } };
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getIssue();
    this.firebaseService.getUserInfo().subscribe((user: User[]) => {
      this.addHistoryModel.name = user[0].name;
    });
  }

}
