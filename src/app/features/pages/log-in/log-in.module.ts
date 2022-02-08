import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogInPageRoutingModule } from './log-in-routing.module';

import { LogInPage } from './log-in.page';

import { SharedModule } from 'src/app/shared/shared.module';
import { ResetPasswordPage } from '../reset-password/reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogInPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LogInPage, ResetPasswordPage]
})
export class LogInPageModule {}
