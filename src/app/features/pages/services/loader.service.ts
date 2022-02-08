import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  constructor(private loaderController: LoadingController) { }

  /**
   * Start Loader
   * 
   * @returns {Promise<void>}
   */
  async startLoader(): Promise<void> {
    const controller = await this.loaderController.create({
      spinner: 'crescent',
      cssClass: 'loader-style',
      showBackdrop: false
    });
    return controller.present();
  }

  /**
   * Stop Loader
   * 
   * @returns {Promise<boolean>}
   */
  async stopLoader(): Promise<boolean> {
    return this.loaderController.dismiss();
  }
}
