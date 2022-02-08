import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { INotification } from 'src/app/features/pages/notification/interfaces/interfaces';

@Component({
  selector: 'app-notification-info',
  templateUrl: './notification-info.component.html',
  styleUrls: ['./notification-info.component.scss'],
})
export class NotificationInfoComponent {
  @Input() notificationInfo: INotification;

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
