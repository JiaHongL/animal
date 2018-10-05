import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../core/services/firebase.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  issues$

  constructor(
    public firebaseService: FirebaseService
  ) {

  }

  Time

  ngOnInit() {
    this.issues$ = this.firebaseService.getIssues().pipe(
      // tap((v:any) => console.log(v)),
      map((v: any) => {
        return v.map((item) => {
          return this.transformTimestampToDate(item, 'createTime');
        })
      })
    );
  }
  transformTimestampToDate(item, name) {
    item[name] = item[name].toDate()
    return item;
  }



}
