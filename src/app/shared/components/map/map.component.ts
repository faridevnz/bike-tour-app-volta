import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import 'leaflet-routing-machine';
import {
  IPoi,
  IPosition,
} from 'src/app/features/pages/home/interfaces/interfaces';
import { MapService } from 'src/app/features/pages/services/map.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [Md5],
})
export class MapComponent implements OnInit {

  @Input() coordinates?: IPosition[];
  @Input() poiList?: IPoi[];
  @Output() idCreated: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('map', { static: true }) HTMLmap;
  idMap: string;

  constructor(
    private mapService: MapService,
    private md5: Md5
  ) {}

  async ngOnInit() {
    let time = new Date();
    this.idMap = Md5.hashStr(time.toString());
    // emit the created id 
    this.idCreated.emit(this.idMap);
    this.mapService.newMap(this.idMap, this.HTMLmap, this.coordinates, this.poiList);
  }

}
