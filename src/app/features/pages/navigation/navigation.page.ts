import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { interval, Observable, Subscription } from 'rxjs';
import { RatingModalComponent } from 'src/app/shared/components/rating-modal/rating-modal.component';
import { IMappedPath, IPosition } from '../home/interfaces/interfaces';
import { HomeService } from '../home/services/home.service';
import { AlertService } from '../services/alert.service';
import { MapService } from '../services/map.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit {
  interval$: Observable<number> = interval(1000);
  sub: Subscription;
  time: number = 0;
  timer: String = '00:00';
  stopTime: boolean = false;
  path: IMappedPath;
  iconBtn: string = 'play';
  iconTimer: string = 'pause';
  uid: string;

  constructor(
    private mapService: MapService,
    private router: Router,
    private navigationService: NavigationService,
    private modalController: ModalController,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((res: Params) => {
      this.uid = res.uid;
      res.targa ? this.mapService.setMarkerPositionBike(res.targa) : this.mapService.setMarkerPosition();
    });
    this.path = this.homeService.pathList.find((path: IMappedPath) => path.uid === this.uid);
  }

  /**
   * open the alert for block the navigation
   * @returns {Promise<void>}
   */
  async onBlock(): Promise<void> {
    await this.alertService.createAlert(
      'Attention!',
      'are you sure you want to end the path?',
      [
        { text: 'Cancel', handler: () => {} },
        { text: 'Yes', handler: this.onBlockAlertYesCallback.bind(this) },
      ]
    );
  }

  /**
   * open the alert for finish the navigation
   * @returns {Promise<void>}
   */
  async onFinish(): Promise<void> {
    await this.alertService.createAlert(
      'Attention!',
      'are you sure you want to finish the path?',
      [
        { text: 'Cancel', handler: () => {} },
        { text: 'Yes', handler: this.onFinishAlertYesCallback.bind(this) },
      ]
    );
  }

  /**
   * Change the icon for the central button
   * @returns {void}
   */
  onStartStop(): void {
    let icon: string;
    icon = this.iconBtn;
    this.iconBtn = this.iconTimer;
    this.iconTimer = icon;
    this.stopTime = !this.stopTime;
    this.timerStartStop();
  }

  /**
   * Start and stop the timer
   * @returns {void}
   */
  private timerStartStop(): void {
    if (this.stopTime) {
      this.sub = this.interval$.subscribe(() => {
        this.run();
      });
    } else {
      this.sub.unsubscribe();
    }
  }

  /**
   * Counter for the stopwatch
   * @returns {void}
   */
  private run(): void {
    this.time++;
    let minutes: String = Math.trunc(this.time / 60).toString();
    let seconds: String = (this.time % 60).toString();

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    let clockStr: String = minutes + ':' + seconds;

    this.timer = clockStr;
  }

  /**
   * open the alert for finish the navigation
   * @returns {Promise<void>}
   */
  private async present(): Promise<void> {
    const modal = await this.modalController.create({
      component: RatingModalComponent,
      cssClass: 'rating-modal',
      backdropDismiss: false,
      componentProps: {
        path: this.path,
      },
    });
    return await modal.present();
  }

  /**
   * block a route and set the route in not completed
   * @returns {void}
   */
  private onBlockAlertYesCallback(): void {
    this.navigationService.addUserRoute(this.path, 4);
    this.router.navigate(['']);
  }

  /**
   * finish a route open rating modal
   * @returns {void}
   */
  private onFinishAlertYesCallback(): void {
    this.present();
  }
}
