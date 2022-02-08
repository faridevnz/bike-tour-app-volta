import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IMappedPath, IPath } from 'src/app/features/pages/home/interfaces/interfaces';
import { NavigationPage } from 'src/app/features/pages/navigation/navigation.page';
import { NavigationService } from 'src/app/features/pages/navigation/services/navigation.service';
import { IUserRouteMapped } from 'src/app/features/pages/travel/interfaces/interfaces';
import { RatingEnum } from './interfaces/interface';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent {
  rating: number;
  StateEnum = RatingEnum;
  @Input() path: IMappedPath;

  constructor(private modalController: ModalController, private router: Router, private navigationService: NavigationService) {}

  onSelect(index: number) {
    this.rating = index;
  }

  onConfirm() {
    this.modalController.dismiss({
      dismissed: true,
    });
    this.navigationService.addUserRoute(this.path, this.rating);
    this.router.navigate([""]);
  }
}
