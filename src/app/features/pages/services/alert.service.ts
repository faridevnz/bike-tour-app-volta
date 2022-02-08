import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IButton } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(public alertController: AlertController) {}

  async createAlert(
    header: string,
    message: string,
    buttonsList: Array<IButton>
  ): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: header,
      message: message,
      buttons: buttonsList,
    });
    await alert.present();
  }
  
}
