import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoPathPage } from '../info-path/info-path.page';
import { LoaderService } from '../services/loader.service';
import {
  IFirebaseUserRoute,
  IUserRouteMapped,
} from './interfaces/interfaces';
import { TravelService } from './services/travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage {
  userPathsList: IUserRouteMapped[] = [];

  constructor(private travelService: TravelService, private loaderService: LoaderService, private modalController: ModalController) {
  }

  ionViewWillEnter() {
    this.getUserPaths()
  }

  ionViewDidLeave() {
    this.userPathsList = []
  }

  async getUserPaths() {
    await this.loaderService.startLoader();
    this.travelService.getUserRoute().subscribe((res: IUserRouteMapped[]) => {

      res.forEach((res: IUserRouteMapped) => {
        this.userPathsList.push({
          ...res,
          tagName: '',
          tagColor: '',
          tagIcon: '',
        });
      });
      // mapping array of paths
      for (let path of this.userPathsList) {
        if (path.difficults) {
          switch (path.difficults) {
            case 'EASY': {
              path.tagName = 'light';
              path.tagColor = 'success';
              path.tagIcon = 'leaf';
              break;
            }
            case 'MEDIUM': {
              path.tagName = 'middle';
              path.tagColor = 'warning';
              path.tagIcon = 'fitness';
              break;
            }
            case 'HARD': {
              path.tagName = 'hard';
              path.tagColor = 'danger';
              path.tagIcon = 'barbell';
              break;
            }
          }
        }
      }
      this.loaderService.stopLoader()
    });
  }

  onPathSelect(path: IUserRouteMapped) {
    this.presentModal(path);
  }

  async presentModal(path: IUserRouteMapped) {
    const modal = await this.modalController.create({
      component: InfoPathPage,
      cssClass: 'info-path-modal',
      componentProps: {
        pathInfo: path,
      },
    });
    return await modal.present();
  }
}
