import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Permission
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

//Firebase
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credential';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
//Google
import { GooglePlus } from '@ionic-native/google-plus/ngx';
//Geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';

// Notification
import { OneSignal } from '@ionic-native/onesignal/ngx';

// Leaflet
import { NglCoreModule } from 'angular-leaflet';
// Scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// Storage
//import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NglCoreModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ],
  // providers: [GooglePlus, Geolocation, OneSignal, AndroidPermissions, Diagnostic, BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  //   NglCoreModule
  // ],
  providers: [GooglePlus, Geolocation, OneSignal, AndroidPermissions, Diagnostic, BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
