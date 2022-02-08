import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelPageRoutingModule } from './travel-routing.module';

import { TravelPage } from './travel.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelPageRoutingModule,
    SharedModule
  ],
  declarations: [TravelPage]
})
export class TravelPageModule {}
