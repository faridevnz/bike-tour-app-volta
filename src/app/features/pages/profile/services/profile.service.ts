import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { IUser } from '../interfaces/IUser.interface';

@Injectable()
export class ProfileService extends FirestoreService {
  constructor(firestore: AngularFirestore, public fireAuth: AngularFireAuth) {
    super(firestore, fireAuth);
  }

  /**
   * Get User Credentials
   *
   * @returns {IUser}
   */
  getCredentials(): IUser {
    const loggedUser: firebase.User = super.getLoggedUser();
    const name: string[] = loggedUser.displayName.split(' ');
    const credentials: IUser = {
      name: name[0],
      surname: name[1],
      email: loggedUser.email,
      photoUrl: loggedUser.photoURL,
      authProvider: loggedUser.providerData[0].providerId
    };
    return credentials;
  }

  /**
   * Logout funtion
   *
   * @returns {void}
   */
  logout(): void {
    this.fireLogout();
  }
}
