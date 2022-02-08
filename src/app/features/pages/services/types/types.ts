type mapReady = {
  [key:string]: boolean
}

type PermissionName = ('LOCATION');
type PermissionsState = {
  [key in PermissionName]: any;
};
type PermissionStatus = ('NOT_REQUESTED'|'DENIED_ONCE'|'DENIED_ALWAYS'|'GRANTED'|'authorized_when_in_use');

type PositionPermissions = ('GRANTED'|'DENIED_ONCE');

export { PermissionsState, PermissionStatus, PositionPermissions, mapReady}
