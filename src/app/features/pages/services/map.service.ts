import { ElementRef, Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { BehaviorSubject, interval } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Geoposition } from '@ionic-native/geolocation';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IFirebasePath, IPoi, IPosition } from '../home/interfaces/interfaces';
import { AngularFirestore, DocumentReference, DocumentSnapshot } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController } from '@ionic/angular';
import { PoiModalComponent } from 'src/app/shared/components/poi-modal/poi-modal.component';
import { EBikeService } from './e-bike.service';
import { IBikeInfo } from './interfaces/interfaces';
import { GeolocationService } from './geolocation.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { PermissionsService } from './permissions.service';
import * as firebase from 'firebase';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class MapService extends FirestoreService {

  isMapReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ROME_COORDS: IPosition = {
    latitude: 41.8915873859966,
    longitude: 12.492043879214123,
  };
  mymap: L.map;
  layerURL: string =
    'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=uA9cHQg2JYhcvngz4NJB';
  markerPosition = L.marker([]);

  myIcon = new L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  });
  myPoiIcon = new L.icon({ iconUrl: '../../../../assets/icons/markerPoi.svg' });
  iconTravel = new L.icon({
    iconUrl: '../../../../assets/icons/mapMarker.svg',
  });

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private modalController: ModalController,
    private eBikeService: EBikeService,
    private geolocationService: GeolocationService,
    private geolocation: Geolocation,
    private loader: LoaderService
  ) { 
    super(firestore, fireAuth);
  }

  setMarkerPosition() {
    this.geolocation.watchPosition().subscribe((geo: Geoposition) => {
      this.markerPosition.remove();
      this.markerPosition = L.marker(
        [geo.coords.latitude, geo.coords.longitude],
        { icon: this.myIcon }
      ).addTo(this.mymap);
      this.mymap.locate({ setView: true, maxZoom: 16 });
    });
  }

  /**
   * Set Current Marker Position when i use E-Bike
   *
   * @param {IPosition} position
   * @returns {void}
   */
  setMarkerPositionBike(targa: string): void {
    interval(1000).subscribe(() => {
      this.eBikeService.findPosition(targa).subscribe((bikeInfo: IBikeInfo) => {
        this.markerPosition.remove();
        this.markerPosition = L.marker(
          [bikeInfo.Latitudine, bikeInfo.Longitudine],
          { icon: this.myIcon }
        ).addTo(this.mymap);
        this.mymap.locate({ setView: true, maxZoom: 16 });
      });
    });
  }

  /**
   * Logic for create new map
   *
   * @param {string} idMap
   * @param HTMLmap
   * @param {string} url
   */
  async newMap(
    idMap: string,
    HTMLmap: ElementRef,
    coordinatesList: IPosition[] = [],
    poiList: IPoi[] = []
  ) {
    
    // set Map and view
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position: IPosition) => {
        coordinatesList.length > 0
          ? this.initMap(coordinatesList[0].latitude, coordinatesList[0].longitude, idMap)
          : this.initMap(position.latitude, position.longitude, idMap);
      }
    });

    // create observer to check MAP Loading state
    const Observer: MutationObserver = new MutationObserver(() => {
      this.isMapReady$.next(true);
      Observer.disconnect();
    });
    Observer.observe(HTMLmap.nativeElement, { attributes: true, attributeFilter: ['class'] });
    // calls to functions after map is READY
    this.isMapReady$.pipe(filter((val: boolean) => val)).subscribe(() => {
      console.log("THE MAP IS READY");
      this.createPath(coordinatesList);
      this.createPoi(poiList);
    });
  }

  /**
   * Inizialize Map and View
   *
   * @param {string} latitude
   * @param {string} longitude
   * @param {string} idMap
   */
  initMap(latitude: number, longitude: number, mapId: string): void {
    // create the MAP
    this.mymap = L.map(mapId);
    // put the LAYER over the MAP
    L.tileLayer(this.layerURL).addTo(this.mymap);
    // set view position
    this.mymap.setView([latitude, longitude], 13);
    this.mymap.locate({ setView: true, maxZoom: 16 });
    // create the marker over the given position
    L.marker([latitude, longitude], { icon: this.myIcon }).addTo(this.mymap);
  }

  /**
   * Create Path
   *
   * @param {Array<IPosition>} coordinates
   */
  private createPath(coordinates: Array<IPosition> = []): void {
    let lastCoords: number = coordinates.length - 1;
    // build the waypoints
    const waypoints: Array<L.latLng> = coordinates.map((coord: IPosition) => {
      return L.latLng(coord.latitude, coord.longitude);
    });
    // add WAYPOINTS to MAP
    var control = L.Routing.control({
      waypoints,
      createMarker: function () {
        return null;
      },
    }).addTo(this.mymap);
    control.hide();

    if (coordinates[0])
      L.marker([coordinates[0].latitude, coordinates[0].longitude], {
        icon: this.myIcon,
      }).addTo(this.mymap);
    if (coordinates[1])
      L.marker(
        [coordinates[lastCoords].latitude, coordinates[lastCoords].longitude],
        { icon: this.myIcon }
      ).addTo(this.mymap);
  }

  /**
   * Create Poi
   *
   * @param {Array<IPosition>} coordinates
   */
  private createPoi(coordinates: Array<IPoi>): void {
    coordinates.forEach((poi: IPoi) => {
      L.marker([poi.coordinates.latitude, poi.coordinates.longitude], {
        icon: this.myPoiIcon,
      })
        .on('click', () => {
          this.present(poi);
        })
        .addTo(this.mymap);
    });
  }

  async present(poi: IPoi) {
    const modal = await this.modalController.create({
      component: PoiModalComponent,
      cssClass: 'poi-modal',
      componentProps: {
        infoPoi: poi,
      },
    });
    return await modal.present();
  }

}
