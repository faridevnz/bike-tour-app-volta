import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { ResetPasswordService } from './service/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private resetPasswordservice: ResetPasswordService,
    private toastService: ToastService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  ngOnInit() {}

  onSendEmail() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordservice
        .resetPassword(this.resetPasswordForm.value.email)
        .subscribe(
          (_) => {
            this.toastService.succesToast(
              'Email successfully sent, check your email box',
              3000
            );
            this.modalController.dismiss();
          },
          (_) => {
            this.toastService.unsuccesToast('Ops, something goes wrong!', 3000);
          }
        );
    }else{
      this.toastService.unsuccesToast('Ops, something goes wrong!', 3000);
    }
  }

  onClose(): void {
    this.modalController.dismiss();
  }
}
