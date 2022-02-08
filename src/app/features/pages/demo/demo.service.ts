import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';
import { catchError, map } from 'rxjs/operators';
import { IFirebasePath, IPosition } from '../home/interfaces/interfaces';
import { HomeService } from '../home/services/home.service';
import { FirestoreService } from '../services/firestore.service';


@Injectable({
  providedIn: 'root'
})
export class DemoService extends FirestoreService{

  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth, private homeService: HomeService) {
    super(firestore, fireAuth);
  }

  logout() {
    this.fireLogout();
  }
}
