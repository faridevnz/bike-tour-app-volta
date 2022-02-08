import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() img?: string;
  @Input() initials: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Reset img if img error
   * 
   * @returns {void}
   */
  onImgError(): void {
    this.img = '';
  }
}
