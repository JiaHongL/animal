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
  issueSubscription:Subscription;
  issue$:Observable<any>;
  id = '';

  constructor(
    private firebaseService: FirebaseService,

    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private loadingService: LoadingService,
  ) {

  }


  getIssue(){
    this.loadingService.creatComponent(this.componentHost.viewContainerRef, 'loading02');
    this.issue$ = this.firebaseService.getIssue(this.id).pipe(
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

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getIssue();
  }

}
