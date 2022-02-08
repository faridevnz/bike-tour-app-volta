import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tagName: string;
  @Input() color: string;
  @Input() icon: string;

  constructor() {}

  ngOnInit() {
  }
}
