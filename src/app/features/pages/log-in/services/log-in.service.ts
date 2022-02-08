import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { ILoginUser } from '../interfaces/intefaces';

@Injectable({
  providedIn: 'root',
})
export class LogInService extends FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {
    super(firestore, fireAuth);
  }

  loginWithCredential(dataLogin: ILoginUser): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    return this.loginWithEmailAndPassword(
      dataLogin.email,
      dataLogin.password
    ).pipe(
      map(
        ((res: firebase.auth.UserCredential) => res),
        ((err: firebase.auth.Error) => err.message)
      )
    );
  }

  googleAuthorizzation(): Observable<
    firebase.auth.UserCredential | firebase.auth.Error
  > {
    return this.googleAuth();
  }
}
