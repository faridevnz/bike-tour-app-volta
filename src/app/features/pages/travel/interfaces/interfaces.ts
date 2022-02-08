import { DocumentReference } from '@angular/fire/firestore';
import { IFirebasePath, IPath } from '../../home/interfaces/interfaces';

interface IUserRouteResponse {
  route: DocumentReference;
  rating: number;
  data: string;
}

interface IFirebaseUserRoute {
  path: IFirebasePath;
  rating: number;
  data: string;
}

interface IUserRoute extends IPath{
  rating: number;
  data: string;
}

interface IUserRouteMapped extends IUserRoute{
  tagName: string;
  tagColor: string;
  tagIcon: string;
}

export { IUserRoute, IUserRouteResponse, IUserRouteMapped, IFirebaseUserRoute };
