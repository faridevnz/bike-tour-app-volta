import { Component, OnInit } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private oneSignal: OneSignal) {}

  ngOnInit() {
    this.oneSignal.startInit(environment.onesignalAppId, environment.googleProjectNumber);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      console.log('received', res);
    // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      console.log('open', res);
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}
