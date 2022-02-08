import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../features/pages/home/home.module').then(
                (m) => m.HomePageModule
              ),
          },
          {
            path: 'tracking-choice/:uid',
            loadChildren: () =>
              import(
                '../../../features/pages/tracking-choice/tracking-choice.module'
              ).then((m) => m.TrackingChoicePageModule),
          },
        ],
      },
      {
        path: 'travel',
        loadChildren: () =>
          import('../../../features/pages/travel/travel.module').then(
            (m) => m.TravelPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../../features/pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import(
            '../../../features/pages/notification/notification.module'
          ).then((m) => m.NotificationPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
