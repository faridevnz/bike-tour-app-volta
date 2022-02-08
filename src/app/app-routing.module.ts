import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard, AuthGuard],
    loadChildren: () =>
      import('./core/components/tabs/tabs.module').then(
        (m) => m.TabsPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/pages/sign-up/sign-up.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('./features/pages/demo/demo.module').then((m) => m.DemoPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/pages/log-in/log-in.module').then(
        (m) => m.LogInPageModule
      ),
  },
  {
    path: 'navigation/:uid',
    loadChildren: () =>
      import('./features/pages/navigation/navigation.module').then(
        (m) => m.NavigationPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
