import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingChoicePageRoutingModule } from './tracking-choice-routing.module';

import { TrackingChoicePage } from './tracking-choice.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingChoicePageRoutingModule,
    SharedModule
  ],
  declarations: [TrackingChoicePage]
})
export class TrackingChoicePageModule {}
