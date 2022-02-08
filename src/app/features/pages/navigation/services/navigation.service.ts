import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { IFirebasePath, IMappedPath } from '../../home/interfaces/interfaces';
import { FirestoreService } from '../../services/firestore.service';
import { IUserRouteMapped, IUserRouteResponse } from '../../travel/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NavigationService extends FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(firestore, fireAuth);
  }

  /**
   * Add path in personal route for logged user
   * 
   * @param path {IUserRouteMapped}
   * @param rating {number}
   */
  addUserRoute(path: IMappedPath, rating: number) {
    let ref: DocumentReference;
    this.getDocument<IFirebasePath>('Route/' + path.uid).subscribe(
      (reference: DocumentSnapshot<IFirebasePath>) => {
        ref = reference.ref;
        this.addDocument<IUserRouteResponse>(
          'users/' + this.fireAuth.auth.currentUser.uid + '/routes',
          {
            route: ref,
            rating: rating,
            data: new Date().toLocaleDateString("en-US")
          }
        );
      }
    );
  }
}
