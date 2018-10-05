import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
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
    return this.afs.collection('issues', ref => {return ref;}).valueChanges();
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
        issue.id = 'no' + (collection.size + 1)
        return this.afs.collection('issues').doc(issue.id).set(issue)
      })
    );
  }


}
