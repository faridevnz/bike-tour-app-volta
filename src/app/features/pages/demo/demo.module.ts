import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemoPageRoutingModule } from './demo-routing.module';

import { DemoPage } from './demo.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PoiModalComponent } from 'src/app/shared/components/poi-modal/poi-modal.component';
import { RatingModalComponent } from 'src/app/shared/components/rating-modal/rating-modal.component';

//Components

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoPageRoutingModule,
    SharedModule
  ],
  declarations: [DemoPage]
})
export class DemoPageModule {}
