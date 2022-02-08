import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from '../services/geolocation.service';
import { Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { MapService } from '../services/map.service';
import { PermissionsService } from '../services/permissions.service';
import { IMappedPath, IPath, IPosition } from './interfaces/interfaces';
import { HomeService } from './services/home.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  startPosition: number = 0;
  currentPosition: number = 0;
  isGeolocated: boolean = false;

  lat: number;
  lng: number;

  pathsList: Array<IMappedPath> = [];

  constructor(
    private homeService: HomeService,
    private geolocation: Geolocation,
    private geolocationService: GeolocationService,
    private platform: Platform,
    private androidPermession: AndroidPermissions,
    private permissionsService: PermissionsService,
    private mapService: MapService
  ) {
    this.geolocationService.getMapPosition().subscribe((geoposition) => {
      this.lat = geoposition.latitude;
      this.lng = geoposition.longitude;
      this.getPaths();
    });
  }

  async ngOnInit(): Promise<void> {
    // if (this.platform.is('android')) {
    //   await this.androidPermession.requestPermission(
    //     this.androidPermession.PERMISSION.ACCESS_FINE_LOCATION
    //   );
    // }
  }

  /**
   * Creation an Array called pathlist with type: IMappedPath,
   * mapping the array and adding the keys useful for creating the tag component,
   * sorting the array by my position
   *
   * @returns {void}
   */
  getPaths(): void {
    this.homeService.getAllPath().subscribe((res: IMappedPath[]) => {
      this.pathsList = res;
      this.geolocationService.currentPosition$
        .pipe(
          filter((position: IPosition) => 
            position.latitude !== this.geolocationService.ROME_COORDS.latitude &&
            position.longitude !== this.geolocationService.ROME_COORDS.longitude)
        )
        .subscribe((position: IPosition) => {
          this.pathsList.forEach((res) => {
            res.distance = this.calcdistance(
              res.positions[0].latitude,
              res.positions[0].longitude,
              position.latitude,
              position.longitude
            );
          });
          this.pathsList.sort((a, b) => {
            return a.distance - b.distance;
          });
        })
      
      // mapping array of paths
      for (let path of this.pathsList) {
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
      //sorting array with my position
        this.pathsList.forEach((res) => {
          res.distance = this.calcdistance(
            res.positions[0].latitude,
            res.positions[0].longitude,
            this.lat,
            this.lng
          );
        });
        this.pathsList.sort((a, b) => {
          return a.distance - b.distance;
        });
      
    });
  }

  /**
   * Calc of distance by two point, my lat, long and lat, long by path
   *
   * @param lat1 {number}
   * @param lon1 {number}
   * @param lat2 {number}
   * @param lon2 {number}
   * @returns {number}
   */
  calcdistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var radlat1 = this.toRad(lat1);
    var radlat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(radlat1) *
        Math.cos(radlat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  /**
   * Calc radiant of lat, long
   *
   * @param value {number}
   * @returns {number}
   */
  toRad(value: number): number {
    return (value * Math.PI) / 180;
  }

}
