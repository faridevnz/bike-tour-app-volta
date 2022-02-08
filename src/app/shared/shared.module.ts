import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { IonicModule } from '@ionic/angular';
import { HiddenPanelComponent } from './components/hidden-panel/hidden-panel.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { MapComponent } from './components/map/map.component';
import { TagComponent } from './components/tag/tag.component';
import { TravelCardComponent } from './components/travel-card/travel-card.component';
import { PoiModalComponent } from './components/poi-modal/poi-modal.component';
import { RatingModalComponent } from './components/rating-modal/rating-modal.component';
import { NotificationInfoComponent } from './components/notification-info/notification-info.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    AvatarComponent,
    HiddenPanelComponent,
    HomeCardComponent,
    MapComponent,
    TagComponent,
    TravelCardComponent,
    PoiModalComponent,
    RatingModalComponent,
    NotificationInfoComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    InputComponent,
    ButtonComponent,
    AvatarComponent,
    HiddenPanelComponent,
    HomeCardComponent,
    MapComponent,
    TagComponent,
    TravelCardComponent,
    PoiModalComponent,
    RatingModalComponent,
    NotificationInfoComponent
  ],
})
export class SharedModule {}
