import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../../services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UpdatePasswordService extends FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    super(firestore, fireAuth);
  }

  updatePassword(newPassword: string): void {
    this.changePasswordOnAuth(newPassword).subscribe();
  }
}