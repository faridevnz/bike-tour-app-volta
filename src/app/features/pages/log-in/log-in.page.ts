import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { inputType } from 'src/app/shared/components/input/types/inputType';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { finalize } from 'rxjs/operators';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  loginForm: FormGroup;
  iconPassword: string = 'eye-off-outline';

  typePassword: inputType = 'password';

  isShowedPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService:ToastService,
    private modalController: ModalController,
    private loaderService: LoaderService,
    private google: GooglePlus,
    private platform: Platform,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  /**
   * On Login Button Click - Login
   *
   * @returns {Promise<void>}
   */
  async onLoginClick(): Promise<void> {
    // invalid form
    if ( !this.loginForm.valid ) {
      this.toastService.unsuccesToast('invalid form', 1000);
      return;
    };
    // valid form
    await this.loaderService.startLoader();
    this.authService.loginWithCredential(this.loginForm.value)
      .pipe(finalize(async () => await this.loaderService.stopLoader()))
      .subscribe(
        async (res: firebase.auth.UserCredential) => {
          const tokenData: firebase.auth.IdTokenResult = await res.user.getIdTokenResult();
          localStorage.setItem('jwt', tokenData.token);
          this.router.navigate(['']);
        },
        (err: string) => {
          this.toastService.unsuccesToast('email e/o password wrong',1000);
        }
      );
  }

  /**
   * On Google Button Click - Google Auth
   *
   * @returns void
   */
  onGoogleClick(): void {

    this.authService.googleAuthorizzation()
      .subscribe(
        (res: firebase.auth.UserCredential) => {
          this.router.navigate(['']);
        },
        (_: firebase.auth.AuthError) => {
          this.toastService.unsuccesToast("Ops, somethings goes wrong!", 1000)
        });

  }

  /**
   * On Show Password
   *
   * @returns {void}
   */
  onShowPassword(): void {
    this.isShowedPassword = !this.isShowedPassword;
    if (this.isShowedPassword) {
      this.iconPassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconPassword = 'eye-off-outline';
      this.typePassword = 'password';
    }
  }

  /**
   * On Reset Password Button Click
   *
   * @returns {Promise<void>}
   */
  async onResetPassword(): Promise<void> {
    const modal = await this.modalController.create({
      component: ResetPasswordPage,
      cssClass: 'central-modal'
    });
    return await modal.present();
  }
}
