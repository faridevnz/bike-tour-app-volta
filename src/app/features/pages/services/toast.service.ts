import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async unsuccesToast(msg: string, duration: number): Promise<void> {
    await (
      await this.toastController.create(this.unsuccessToasterConfig(msg, duration))
    ).present();
  }

  async succesToast(msg: string, duration: number): Promise<void> {
    await (
      await this.toastController.create(this.successToasterConfig(msg, duration))
    ).present();
  }

  private successToasterConfig = (message: string, duration: number) => {
    const toastStyle = {
      color: 'success',
      message,
      cssClass: 'toaster-style',
      duration,
    };
    return toastStyle;
  };
  
  private unsuccessToasterConfig = (message: string, duration: number) => {
    const toastStyle = {
      color: 'danger',
      message,
      cssClass: 'toaster-style',
      duration,
    };
    return toastStyle;
  };
}
