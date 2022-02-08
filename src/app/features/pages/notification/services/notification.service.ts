import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { INotification } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends FirestoreService {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(firestore, fireAuth);
  }

  /**
   * Get all of notifications
   * 
   * @returns {Observable<Array<INotification>>}
   */
  getNotifications(): Observable<Array<INotification>> {
    return this.getCollection<Array<INotification>>('notifications').pipe(
      map((res: QuerySnapshot<Array<INotification>>) => {
        const notifications: Array<INotification> = [];
        res.forEach((res: QueryDocumentSnapshot<INotification>) => {
          notifications.push(res.data());
        });
        return notifications;
      })
    );
  }
}
