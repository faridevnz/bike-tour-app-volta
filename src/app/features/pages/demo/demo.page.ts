import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NotificationInfoComponent } from 'src/app/shared/components/notification-info/notification-info.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage {
  backdropVisible: boolean = false;
  url: string;
  notification = {
    linkPoi:
      'https://www.camminareinabruzzo.it/wp-content/uploads/2018/07/DSC_5452-Media.jpg',
    name: 'Prova',
    shortDescription: 'test',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id delectus fugit labore rerum exercitationem quoss ',
    coordinates: [42.160745, 14.132655],
    services: ['bar', 'hotel', 'bar', 'hotel', 'bar', 'hotel'],
  };

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    //this.route = demoService.getRoute();
  }

  ngOnInit() {
    //this.homeService.getPositions();
  }

  async present(notification) {
    const modal = await this.modalController.create({
      component: NotificationInfoComponent,
      cssClass: 'info-notification',
      componentProps: {
        notification: notification,
      },
    });
    return await modal.present();
  }
}
