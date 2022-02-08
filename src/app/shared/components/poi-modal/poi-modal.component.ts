import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPoi } from 'src/app/features/pages/home/interfaces/interfaces';

@Component({
  selector: 'app-poi-modal',
  templateUrl: './poi-modal.component.html',
  styleUrls: ['./poi-modal.component.scss'],
})
export class PoiModalComponent {

  @Input() infoPoi: IPoi;

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
