import { DocumentReference } from "angularfire2/firestore";

interface IPath {
  linkRoutes: string;
  poiList: IPoi[];
  difficults: DifficultEnum; 
  shortDescription: string;
  description: string;
  duration: string;
  differenceHeight: string;
  calories: string;
  positions: IPosition[];
  uid: string;
}

interface IMappedPath extends IPath {
  tagName: string;
  tagColor: string;
  tagIcon: string;
  distance: number;
}

interface IPoi {
  linkPoi: string;
  name: string;
  shortDescription: string;
  description: string;
  coordinates: IPosition;
  services: string[];
}

enum DifficultEnum {
  "EASY" = "EASY",
  "MEDIUM" = "MEDIUM",
  "HARD" = "HARD"
}

type IPosition = {
  latitude: number;
  longitude: number;
}

interface IFirebasePath {
  linkRoutes: string;
  poiList: DocumentReference[];
  difficults: DifficultEnum; 
  shortDescription: string;
  description: string;
  duration: string;
  differenceHeight: string;
  calories: string;
  positions: firebase.firestore.GeoPoint[];
  uid: string;
}

export { IPath, IPoi, DifficultEnum, IFirebasePath, IPosition, IMappedPath};
