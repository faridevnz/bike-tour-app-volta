import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService extends FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(firestore, fireAuth);
  }

  resetPassword(email: string): Observable<void>{
    return this.resetPasswordOnAuth(email);
  }
}
