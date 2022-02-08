import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationInfoComponent } from 'src/app/shared/components/notification-info/notification-info.component';
import { INotification } from './interfaces/interfaces';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationList: INotification[];

  constructor(
    private notificationService: NotificationService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.notificationService
      .getNotifications()
      .subscribe((res: INotification[]) => {
        this.notificationList = res;
      });
  }

  async onNotificationSelect(notification: INotification) {
    const modal = await this.modalController.create({
      component: NotificationInfoComponent,
      cssClass: 'info-notification',
      componentProps: {
        notificationInfo: notification,
      },
    });
    return await modal.present();
  }
}
