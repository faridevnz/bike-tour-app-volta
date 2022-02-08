import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  DocumentSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  IFirebasePath,
  IPath,
  IPoi,
  IPosition,
} from '../../home/interfaces/interfaces';
import { FirestoreService } from '../../services/firestore.service';
import {
  IFirebaseUserRoute,
  IUserRoute,
  IUserRouteResponse,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TravelService extends FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(firestore, fireAuth);
  }

  /**
   * Get all personal paths made by a single logged user
   * 
   * @returns {Observable<IUserRoute[]>}
   */
  getUserRoute(): Observable<IUserRoute[]> {
    return this.getCollection<IUserRouteResponse>(
      'users/' + this.fireAuth.auth.currentUser.uid + '/routes'
    ).pipe(
      // map firebase data to Object with reference
      map(async (res: QuerySnapshot<IUserRouteResponse>) => {
        const mapped: IFirebaseUserRoute[] = [];
        for (let doc of res.docs) {
          mapped.push({
            ...doc.data(),
            path: (await this.getReference(doc.data().route)
              .toPromise() as DocumentSnapshot<IFirebasePath>).data()
          });
        }
        return mapped;
      }),
      map(async (res: Promise<IFirebaseUserRoute[]>) => {
        const mapped: IUserRoute[] = [];
        const result = await res;
        for (let path of result) {
          const mappedPath: IUserRoute = {
            ...path.path,
            poiList: this.getPoi(path.path),
            positions: this.getPositions(path.path),
            data: path.data,
            rating: path.rating
          };
          mapped.push(mappedPath);
        }
        return mapped;
      }),
      switchMap((promise: Promise<IUserRoute[]>) => {
        return from(promise);
      })
    );
  }

  /**
   * Get all the point of intereste of a path
   *
   * @param path{IFirebasePath}
   * @returns {Observable<Array<IPath>>}
   */
  getPoi(path: IFirebasePath): Array<IPoi> {
    const poi: Array<IPoi> = [];
    path.poiList.forEach((referenceDocument) =>
      this.getReference(referenceDocument).subscribe(
        (res: DocumentSnapshot<IPoi>) => {
          poi.push(res.data());
        }
      )
    );
    return poi;
  }

  /**
   * Get all the position of intereste of a path
   *
   * @param path{IFirebasePath}
   * @returns {Position[]}
   */
  private getPositions(path: IFirebasePath): Array<IPosition> {
    const position: Array<IPosition> = [];
    path.positions.forEach((pos: firebase.firestore.GeoPoint) => {
      position.push({ latitude: pos.latitude, longitude: pos.longitude });
    });
    return position;
  }
}
