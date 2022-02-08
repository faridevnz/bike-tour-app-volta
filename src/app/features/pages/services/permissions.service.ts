import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { from, Observable, Observer, pipe, Subscriber } from 'rxjs';
import { skip, switchMap, tap } from 'rxjs/operators';
import { PermissionsState, PermissionStatus } from './types/types';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  currentPermissions: PermissionsState = {} as PermissionsState;

  constructor(private diagnostic: Diagnostic) {}

  grantPositionPermission(): Observable<PermissionStatus> {
    return from(
      this.diagnostic.getLocationAuthorizationStatus() as Promise<PermissionStatus>
    ).pipe(
      switchMap((status: PermissionStatus) => {
        if (status === 'NOT_REQUESTED')
          return from(this.diagnostic.requestLocationAuthorization());
        return from(status) as Observable<PermissionStatus>;
      })
    );
  }
}
