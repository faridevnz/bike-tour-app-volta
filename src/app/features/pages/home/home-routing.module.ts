import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPathPage } from '../info-path/info-path.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
