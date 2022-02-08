import { Component, Input, OnInit } from '@angular/core';
import { IUserRouteMapped } from 'src/app/features/pages/travel/interfaces/interfaces';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.scss'],
})
export class TravelCardComponent implements OnInit {

  @Input() path: IUserRouteMapped;

  svg: string;

  constructor() {}
  
  ngOnInit() {
    switch(this.path.rating){
      case(1):{
        this.svg = "../../../../assets/icons/sad.svg";
        break;
      }
      case(2):{
        this.svg = "../../../../assets/icons/middle.svg";
        break;
      }
      case(3):{
        this.svg = "../../../../assets/icons/happy.svg";
        break;
      }
    }
  }

}
