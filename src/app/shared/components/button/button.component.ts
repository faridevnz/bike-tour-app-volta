import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ColorButton } from './types/buttonTypes';
import { ImgSize } from './types/imgTypes';
import { TextSize } from './types/textTypes';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnChanges {
  @Input() color: ColorButton;
  @Input() borderRadius: number = 15;
  @Input() shadow: boolean = false;
  @Input() circle: boolean = false;
  @Input() sizeText: TextSize;
  @Input() sizeImg: ImgSize;
  @Input() imgName: string;

  imgUrl: string;

  constructor() {}

  ngOnChanges() {
    this.imgUrl = '../../../../assets/icons/' + this.imgName + '.svg';
  }
}
