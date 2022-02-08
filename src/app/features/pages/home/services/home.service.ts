import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import {
  IFirebasePath,
  IMappedPath,
  IPath,
  IPoi,
  IPosition,
} from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends FirestoreService {
  pathList: IMappedPath[] = [];

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(firestore, fireAuth);
  }

  /**
   * Get all the path in Firebase
   *
   * @returns {Observable<Array<IMappedPath>>}
   */
  getAllPath(): Observable<Array<IMappedPath>> {
    return this.getCollection<IFirebasePath>('Route').pipe(
      map((routes: firebase.firestore.QuerySnapshot<IFirebasePath>) => {
        const paths: Array<IPath> = [];
        routes.forEach(
          (route: firebase.firestore.QueryDocumentSnapshot<IFirebasePath>) => {
            const singleRoute: IPath = {
              ...route.data(),
              poiList: this.getPoi(route),
              positions: this.getPositions(route),
            };
            paths.push(singleRoute);
          }
        );
        return paths;
      }),
      map((res: Array<IPath>) => {
        for(let x of res){
          this.pathList.push({
            ...x,
            tagName: '',
            tagColor: '',
            tagIcon: '',
            distance: 0,
          })
        }
        // mapping array of paths
        for (let path of this.pathList) {
          if (path.difficults) {
            switch (path.difficults) {
              case 'EASY': {
                path.tagName = 'light';
                path.tagColor = 'success';
                path.tagIcon = 'leaf';
                break;
              }
              case 'MEDIUM': {
                path.tagName = 'middle';
                path.tagColor = 'warning';
                path.tagIcon = 'fitness';
                break;
              }
              case 'HARD': {
                path.tagName = 'hard';
                path.tagColor = 'danger';
                path.tagIcon = 'barbell';
                break;
              }
            }
          }
        }
        return this.pathList;
      })
    );
  }

  /**
   * Get all the point of intereste of a route
   *
   * @param route{firebase.firestore.QueryDocumentSnapshot<IFirebasePath>}
   * @returns {Observable<Array<IPath>>}
   */
  getPoi(
    route: firebase.firestore.QueryDocumentSnapshot<IFirebasePath>
  ): Array<IPoi> {
    const poi: Array<IPoi> = [];
    route.data().poiList.forEach((referenceDocument) =>
      this.getReference(referenceDocument).subscribe(
        (res: DocumentSnapshot<IPoi>) => {
          poi.push(res.data());
        }
      )
    );
    return poi;
  }

  /**
   * Get all the position of intereste of a route
   *
   * @param route{firebase.firestore.QueryDocumentSnapshot<IFirebasePath>}
   * @returns {Position[]}
   */
  private getPositions(
    route: firebase.firestore.QueryDocumentSnapshot<IFirebasePath>
  ): Array<IPosition> {
    const position: Array<IPosition> = [];
    route.data().positions.forEach((pos: firebase.firestore.GeoPoint) => {
      position.push({ latitude: pos.latitude, longitude: pos.longitude });
    });
    return position;
  }
}
