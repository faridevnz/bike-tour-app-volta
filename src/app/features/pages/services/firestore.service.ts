import {
  DocumentSnapshot,
  QuerySnapshot,
  AngularFirestore,
  DocumentReference,
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { from, Observable, of, throwError } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { customError } from '../services/mapError/errors.map';

@Injectable()
export class FirestoreService {

  angularFirestore: AngularFirestore;
  angularFireAuth: AngularFireAuth;

  constructor(
    firestore: AngularFirestore,
    fireAuth: AngularFireAuth
  ) {
    this.angularFirestore = firestore;
    this.angularFireAuth = fireAuth;
  }

  /**
   * Get document by path from firestore
   *
   * @param {string} documentPath
   * @returns {Observable<DocumentSnapshot<T>>}
   */
  protected getDocument<T>(
    documentPath: string
  ): Observable<DocumentSnapshot<T>> {
    return this.angularFirestore.doc<T>(documentPath).get() as Observable<
      DocumentSnapshot<T>
    >;
  }

  /**
   * Get collection by path from firestore
   *
   * @param {string} collectionPath
   * @returns {Observable<QuerySnapshot<T>>}
   */
  protected getCollection<T>(
    collectionPath: string
  ): Observable<QuerySnapshot<T>> {
    return this.angularFirestore
      .collection<T>(collectionPath)
      .get() as Observable<QuerySnapshot<T>>;
  }

  /**
   *
   * @param reference {DocumentReference}
   * @returns {Observable<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>}
   */
  protected getReference<T>(
    reference: DocumentReference
  ): Observable<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > {
    return from(reference.get());
  }

  /**
   * Add Document in firestore
   *
   * @param {string} pathCollection
   * @param {T} data
   * @returns {Observable<firebase.firestore.DocumentReference<T>>}
   */
  protected addDocument<T>(
    pathCollection: string,
    data: T
  ): Observable<firebase.firestore.DocumentReference<T>> {
    return from(
      this.angularFirestore.collection<T>(pathCollection).add(data) as Promise<
        firebase.firestore.DocumentReference<T>
      >
    );
  }

  protected addDocumentWithUid<T>(
    pathCollection: string,
    data: T,
    uid: string
  ): Observable<void>{
    return from(
      this.angularFirestore.collection<T>(pathCollection).doc(uid).set(data)
    );
  }

  /**
   * Update Document in firestore
   *
   * @param {string} documentPath
   * @param {T} data
   * @returns {void}
   */
  protected updateDocument<T>(documentPath: string, data: T): void {
    this.angularFirestore.doc<T>(documentPath).update(data);
  }

  /**
   *Reset Password in Firebase Authentication
   *
   *@param {string} email
   * @returns {void}
   *
   */
  protected resetPasswordOnAuth(email: string): Observable<void> {
    return from(this.angularFireAuth.auth.sendPasswordResetEmail(email));
  }

  /**
   * Change Password in Firebase Authentication
   *
   * @param {string} password
   * @returns {Observable<void>}
   */
  protected changePasswordOnAuth(password: string): Observable<void> {
    return from(
      this.angularFireAuth.auth.currentUser?.updatePassword(password)
    );
  }

  /**
   * Sign In with Google
   *
   * @returns {Observable<firebase.auth.UserCredential>}
   */
  protected googleAuth(): Observable<
    firebase.auth.UserCredential | firebase.auth.Error
  > {
    return this.authLogin(new firebase.auth.GoogleAuthProvider()).pipe(
      this.mapError
    );
  }

  /**
   * Auth logic to run auth with email and password
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  protected loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    return from(
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    ).pipe(this.mapError);
  }

  protected authWithCredential(
    credential
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    return from(this.angularFireAuth.auth.signInWithCredential(credential));
  }

  /**
   * Create user with email and password and
   * update user profile in firestore database
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  protected fireSignup(
    email: string,
    password: string,
    displayName: string
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    return new Observable((observer) => {
      this.angularFireAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res: firebase.auth.UserCredential) => {
          // add 'displayname' to registered user
          await res.user.updateProfile({ displayName: displayName });
          observer.next(res);
        })
        // use not created
        .catch((err: firebase.auth.Error) => observer.error(err));
    }).pipe(this.mapError);
  }

  /**
   *  Firestore logout
   *
   * @returns {Observable<void>}
   */
  protected fireLogout(): Observable<void> {
    return from(this.angularFireAuth.auth.signOut());
  }

  /**
   * Get Current Logged User
   *
   * @returns {firebase.User}
   */
  protected getLoggedUser(): firebase.User {
    return firebase.auth().currentUser;
  }

  /**
   * Auth logic to run auth providers
   *
   * @param {firebase.auth.AuthProvider} provider
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  private authLogin(
    provider: firebase.auth.AuthProvider
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    return new Observable((observer) => {
      this.angularFireAuth.auth
        .signInWithPopup(provider)
        .then(async (result: firebase.auth.UserCredential) => {
          await result.user
            .getIdToken()
            .then((res: string) => localStorage.setItem('jwt', res));
          observer.next(result);
        })
        .catch((error: firebase.auth.Error) => observer.error(error));
    }).pipe(this.mapError);
  }

  /**
   * Rxjs operator custom for mapping Firebase Error
   *
   * @param {Observable<any>} source$
   * @returns {Observable<firebase.auth.Error>}
   */
  private mapError(
    source$: Observable<any>
  ): Observable<firebase.FirebaseError> {
    return source$.pipe(
      catchError((res: any) => {
        if (customError[res.code]) res.message = customError[res.code];
        return throwError(res);
      })
    );
  }
  
}
