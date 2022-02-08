import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {  map, tap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
import { IUser } from '../sign-up/interfaces/sign-up.interfaces';
import { ILoginUser } from '../log-in/interfaces/intefaces';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends FirestoreService {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private google: GooglePlus
  ) { 
    super(firestore, fireAuth);
  }

  /**
   * Add User on Firebase Firestore and Firebase Authentication 
   * 
   * @param {IUser} data 
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  addUser(
    data: IUser
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    // synchronize addFireUser e adduser
    return this._addFireUser(data)
      .pipe(tap(_ => this._addNormalUser(data)));
  }

  /**
   * Add User on Firebase Firestore
   * 
   * @returns {void}
   */
  private _addNormalUser(data: IUser): void {
    delete data.password;
    this.addDocumentWithUid<IUser>('users', data, this.fireAuth.auth.currentUser.uid);
  }

  /**
   * Add User on Firebase Authentication
   * 
   * @param {IUser} data 
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  private _addFireUser(
    data: IUser
  ): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    const displayName = data.name + ' ' + data.surname;
    return this.fireSignup(data.email, data.password, displayName);
  }

  /**
   * Login using credential (email and password) with firebase Authentication methods 
   * 
   * @param {ILoginUser} dataLogin 
   * @returns {Observable<string>}
   */
  loginWithCredential(dataLogin: ILoginUser): Observable<any> {
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

  /**
   * Google Auth
   * Check with platform i'm using, and then try to login in that platform
   * 
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  googleAuthorizzation(): Observable<
    firebase.auth.UserCredential | firebase.auth.Error
  > {
    let params: any;
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        params = {
          webClientId: '780768746149-3juhdqdka9kovkd3fde26tm7g4q5ihi2.apps.googleusercontent.com',
          offline: true
        };
      } else {
        params = {};
      }
      return new Observable((observer) => {
        this.google.login(params)
          .then(res => {
            const { idToken, accessToken } = res;
            localStorage.setItem('jwt', accessToken);
            this.onLoginSuccess(idToken, accessToken)
              .subscribe(
                res => {
                  observer.next(res);
                },
                err => {
                  observer.error(err);
                }
              )
          })
          .catch(
            err => {
              this.onLoginError(err);
              observer.next(err);
            }
          );
      });
    } else{
      return this.googleAuth();
    }
  }

  /**
   * On Login Success - if login with google success
   * Call Firestore Service function to authenticate the user
   * 
   * @param {string} getIdToken 
   * @param {string} accessToken 
   * @returns {Observable<firebase.auth.UserCredential | firebase.auth.Error>}
   */
  private onLoginSuccess(getIdToken: string, accessToken: string): Observable<firebase.auth.UserCredential | firebase.auth.Error> {
    const credential = 
      accessToken 
        ? firebase.auth.GoogleAuthProvider.credential(getIdToken, accessToken) 
        : firebase.auth.GoogleAuthProvider.credential(getIdToken);

    return this.authWithCredential(credential);
  }

  /**
   * On Login Error - if login with google error
   * 
   * @returns {void}
   */
  private onLoginError(err): void {}
  
}
