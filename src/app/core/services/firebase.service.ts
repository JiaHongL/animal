import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take, map, mergeMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private dataPipe: DatePipe,
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

  getRole2(): Observable<{}[]> {
    return this.afs.collection('users', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      return query;
    }).valueChanges();
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
        issue.id = this.dataPipe.transform(new Date, 'yyyyMMdd') + this.padLeft((collection.size + 1), 4)
        return this.afs.collection('issues').doc(issue.id).set(issue)
      })
    );
  }

  padLeft(str,length) {
    if (str.length >= length){
      return str;
    }else{
      return this.padLeft("0" + str, length);
    }
  }


}
