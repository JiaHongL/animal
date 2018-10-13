import { Issue } from './../../models/issues';
import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take, map, mergeMap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { UtilService } from './util.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  resetFeedbackFormSubject$ = new Subject();

  issuePageIdList = [];

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private utilService: UtilService,
    @Inject(LOCALE_ID) private locale: string

  ) {

  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  isLogin() {
    return this.afAuth.authState.pipe(
      take(1),
      map((authState) => !!authState)
    )
  }

  isAdmin() {
    return this.afAuth.authState.pipe(
      mergeMap((user) => {
        return this.getRole(user.uid)
      })
      ,
      map((user: any) => {
        return user[0].role == 'admin';
      })
    )
  }

  getRole(uid): Observable<{}[]> {
    return this.afs.collection('users', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('uid', '==', uid)
      return query;
    }).valueChanges();
  }

  getUserState() {
    return this.afAuth.authState;
  }

  getUserInfo() {
    return this.afAuth.authState.pipe(
      mergeMap((user) => {
        return this.getRole(user.uid)
      })
    )
  }

  getResetFeedbackFormNotice() {
    return this.resetFeedbackFormSubject$.asObservable();
  }

  sendResetFeedbackFormNotice() {
    this.resetFeedbackFormSubject$.next('reset');
  }

  postFeedback(issue) {
    return this.afs.collection('issues').get().pipe(
      mergeMap((collection) => {
        issue.id = formatDate(issue.createTime, 'yyyyMMdd', this.locale) + this.padLeft((collection.size + 1), 4);
        return this.afs.collection('issues').doc(issue.id).set(issue);
      })
    );
  }

  padLeft(str, length) {
    if (str.length >= length)
      return str;
    else
      return this.padLeft("0" + str, length);
  }

  getIssues(queryStatus) {
    this.issuePageIdList = [];
    return this.afs.collection('issues', ref => {
      let queryRef;
      if (queryStatus !== -1) {
        queryRef = ref.where('status', '==', queryStatus)
      } else {
        queryRef = ref.where('status', '<', 99);
      };
      return queryRef;
    }).valueChanges().pipe(
      map((v) => {
        v.sort((a: any, b: any) => {
          return a.id > b.id ? 1 : -1;
        });
        v.map((item) => {
          return this.utilService.transformTimestampToDate(item, 'createTime');
        });
        let obj = {
          total: v.length,
          pages: []
        };
        for (var i = 0, len = v.length; i < len; i += 10) {
          obj.pages.push(v.slice(i, i + 10));
        };
        return obj
      })
    );
  }

  getIssue(id): Observable<{}[]> {
    return this.afs.collection('issues',
      ref => {
        return ref.where('id', '==', id)
      }).valueChanges().pipe(
        map((v:Issue[]) => {
          v[0].history.sort((a: any, b: any) => {
            return b.createTime > a.createTime ? 1 : -1;
          });
          return v
        })
      );
  }

  updateIssue(issue) {
    return this.afs.collection('issues').doc(issue.id).update(issue);
  }

}
