import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take, map, mergeMap, tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    @Inject(LOCALE_ID) private locale: string
    
  ) {

  }

  login(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getRole(uid): Observable<{}[]> {
    return this.afs.collection('users', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('uid', '==', uid)
      return query;
    }).valueChanges();
  }

  getIssues(): Observable<{}[]> {
    return this.afs.collection('issues', ref => { return ref; }).valueChanges();
  }

  getTotal() {
    return this.afs.collection('issues', ref => {
      return ref;
    }).valueChanges().pipe(
      map((v) => {
        let obj = {
          total: v.length
        }
        return obj
      })
    );
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
      }),
      map((user: any) => {
        return user[0].role == 'admin';
      })
    )
  }

  getUserState() {
    return this.afAuth.authState;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  postFeedback(issue) {
    return this.afs.collection('issues').get().pipe(
      mergeMap((collection) => {
        issue.id = formatDate(issue.createTime, 'yyyyMMdd' , this.locale) + this.padLeft((collection.size + 1), 4);
        return this.afs.collection('issues').doc(issue.id).set(issue)
      })
    );
  }

  padLeft(str, length) {
    if (str.length >= length)
      return str;
    else
    return this.padLeft("0" +str,length);
  }

}
