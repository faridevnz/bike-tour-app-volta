import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { ProfileService } from './services/profile.service';
import { FirestoreService } from '../services/firestore.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordPage } from '../change-password/change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ProfilePage, ChangePasswordPage],
  providers: [ProfileService, FirestoreService]
})
export class ProfilePageModule {}
