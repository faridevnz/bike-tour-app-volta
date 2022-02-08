import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {
  @Input() img: string;
  @Input() title: string;
  @Input() duration: string;
  @Input() description: string;
  @Input() tagName: string;
  @Input() tagIcon: string;
  @Input() tagColor: string;
  @Input() data: string;

  constructor() {}

  ngOnInit() {}
}
