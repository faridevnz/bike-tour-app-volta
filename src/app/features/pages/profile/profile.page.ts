import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/IUser.interface';
import { ProfileService } from './services/profile.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ChangePasswordPage } from '../change-password/change-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  credentials: IUser;
  initials: string;

  constructor(
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router
  ) {
  }

  ionViewWillEnter() {
    this.getCredential();
  }

  ngOnInit(): void { }

  getCredential() {
    this.credentials = this.profileService.getCredentials();
    this.initials = (
      this.credentials.name.charAt(0) + this.credentials.surname.charAt(0)
    ).toUpperCase();
  }

  async onResetPassword() {

    const modal = await this.modalController.create({
      component: ChangePasswordPage,
      cssClass: 'central-modal'
    });
    return await modal.present();
  }

  onLogout(): void {
    this.profileService.logout();

    // remove token from local storage
    localStorage.removeItem('jwt');

    // redirect to login
    this.router.navigate(['/login']);
  }

}
