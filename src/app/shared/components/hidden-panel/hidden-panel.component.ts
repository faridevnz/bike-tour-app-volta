import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  IMappedPath,
  IPath,
} from 'src/app/features/pages/home/interfaces/interfaces';
import { InfoPathPage } from 'src/app/features/pages/info-path/info-path.page';
import { LoaderService } from 'src/app/features/pages/services/loader.service';
import { MapService } from 'src/app/features/pages/services/map.service';
import { filter, finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-hidden-panel',
  templateUrl: './hidden-panel.component.html',
  styleUrls: ['./hidden-panel.component.scss'],
})
export class HiddenPanelComponent implements OnInit {
  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Input() pathsList: Array<IMappedPath>;

  isClosed: boolean = true;
  openHeight: number = 0;
  startPosition: number = 0;
  currentPosition: number = 0;

  lat: number;
  lng: number;
  isGeolocated: boolean;

  constructor(
    private plt: Platform,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private loader: LoaderService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {}

  /**
   * listen touch event and determinate if he's doing swipe up or down
   * in base of start position and current position of touch
   *
   * @param e {TouchEvent}
   */
  touchMove(e: TouchEvent) {
    if (this.startPosition == 0) {
      this.startPosition = Math.ceil(e.touches[0].clientY);
    }
    this.currentPosition = Math.ceil(e.touches[0].clientY);
  }

  /**
   * when the touch event end this function check if the swip is up or down
   * in base of that the div has an opening or closing animation
   *
   */
  touchEnd() {
    const drawer = this.drawer.nativeElement;
    this.openHeight = (this.plt.height() / 100) * 65;

    if (this.currentPosition < this.startPosition && this.isClosed) {
      drawer.style.transition = '.4s ease-in';
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isClosed = false;
    } else {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = '';
      this.isClosed = true;
    }
  }

  async onPathSelect(path: IMappedPath) {
    await this.presentModal(path);
  }

  async presentModal(path: IMappedPath) {
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
