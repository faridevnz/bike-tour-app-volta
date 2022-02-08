import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { filter, finalize, map } from 'rxjs/operators';
import { IMappedPath } from '../home/interfaces/interfaces';
import { LoaderService } from '../services/loader.service';
import { MapService } from '../services/map.service';
import { mapReady } from '../services/types/types';
import { IUserRouteMapped } from '../travel/interfaces/interfaces';

@Component({
  selector: 'app-info-path',
  templateUrl: './info-path.page.html',
  styleUrls: ['./info-path.page.scss'],
})
export class InfoPathPage implements OnInit {
  
  modalMapId: string;
  @Input() pathInfo: IUserRouteMapped;

  svg: string;

  constructor(
    private modalController: ModalController,
    private mapService: MapService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  async ngOnInit() {
    // start the loader that wait for map ready
    // await this.loaderService.startLoader();
    this.mapService.isMapReady$
      .pipe(
        filter((val: boolean|mapReady) => !!val[this.modalMapId]),
      )
      .subscribe(async (val: mapReady) => {
        // await this.loaderService.stopLoader()
      })

      switch(this.pathInfo.rating){
        case(1):{
          this.svg = "../../../../assets/icons/sad.svg";
          break;
        }
        case(2):{
          this.svg = "../../../../assets/icons/middle.svg";
          break;
        }
        case(3):{
          this.svg = "../../../../assets/icons/happy.svg";
          break;
        }
        case(4):{
          this.svg = "";
          break;
        }
      }
    
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  onStart(pathInfo: IUserRouteMapped) {
    this.dismiss();
    this.router.navigate(['/tabs/home/tracking-choice', pathInfo.uid]);
  }

  onMapIdCreated(mapId: string) {
    this.modalMapId = mapId;
  }

}
