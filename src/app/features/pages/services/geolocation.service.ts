import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PermissionStatus, PositionPermissions } from './types/types';
import { PermissionsService } from './permissions.service';
import { IPosition } from '../home/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  
  // default position
  ROME_COORDS: IPosition = {
    latitude: 41.8915873859966,
    longitude: 12.492043879214123,
  };
  // observable that watch current position
  currentPosition$: BehaviorSubject<IPosition> = new BehaviorSubject<IPosition>(
    this.ROME_COORDS
  );

  constructor(
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private permissionsService: PermissionsService
  ) {}

  /**
   * Get Current position if user's permission
   * Default Rome Position
   *
   * @returns {Observable<any>}
   */
  getMapPosition(): Observable<IPosition> {
    this.diagnostic
      .requestLocationAuthorization()
      .then((outcome: PositionPermissions) => {
        if (outcome === 'DENIED_ONCE') return;
        // start to watch position
        this.geolocation
          .getCurrentPosition()
          .then((pos) =>
            this.currentPosition$.next({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            })
          );
        this.startWatchingPosition();
      });
    // return the local observable that watch the current position
    return this.currentPosition$;
  }

  getCurrentPosition(): Observable<IPosition> {
    return this.permissionsService.grantPositionPermission().pipe(
      switchMap((status: PermissionStatus) => {
        if (['DENIED_ONCE', 'DENIED_ALWAYS'].includes(status))
          return of(this.ROME_COORDS);
        return from(this.geolocation.getCurrentPosition()).pipe(
          // conversion from Geoposition to IPosition
          map((position: Geoposition) => {
            return {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
          }),
          // next over currentPosition$ observable
          tap((position: IPosition) => this.currentPosition$.next(position))
        );
      })
    );
  }

  startWatchingPosition(): void {
    this.geolocation.watchPosition().subscribe((position: Geoposition) => {
      this.currentPosition$.next({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  getPermission(): Observable<any> {
    return from(this.diagnostic.isLocationAuthorized());
  }

}
