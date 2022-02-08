import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingChoicePage } from './tracking-choice.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingChoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingChoicePageRoutingModule {}
