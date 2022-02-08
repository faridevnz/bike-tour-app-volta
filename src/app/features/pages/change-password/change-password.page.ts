import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { inputType } from 'src/app/shared/components/input/types/inputType';
import { ToastService } from '../services/toast.service';
import { validatePasswordMatch } from '../sign-up/validators/password-check.validator';
import { UpdatePasswordService } from './services/update-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  error: boolean = false;
  iconPassword: string = 'eye-off-outline';
  iconCheckedPassword: string = 'eye-off-outline';
  typePassword: inputType = 'password';
  typeCheck: inputType = 'password';
  isShowedPassword: boolean;
  isShowedChecked: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private updatePassword: UpdatePasswordService,
    private toastService: ToastService,
    private modalController: ModalController
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required, Validators.minLength(6)]],
      },
      { validators: [validatePasswordMatch] }
    );
  }

  ngOnInit() {}

  onChangePasswordClick(): void {
    if (this.changePasswordForm.valid) {
      this.updatePassword.updatePassword(
        this.changePasswordForm.value.password
      );
      this.toastService.succesToast('password changed', 1000);
      this.modalController.dismiss();
    } else {
      this.toastService.unsuccesToast('Ops, something goes wrong!', 1000);
    }
  }

  onClose() {
    this.modalController.dismiss();
  }

  onshowPassword(): void {
    this.isShowedPassword = !this.isShowedPassword;
    if (this.isShowedPassword) {
      this.iconPassword = 'eye';
      this.typePassword = 'text';
    } else {
      this.iconPassword = 'eye-off-outline';
      this.typePassword = 'password';
    }
  }

  onshowCheckPassword(): void {
    this.isShowedChecked = !this.isShowedChecked;
    if (this.isShowedChecked) {
      this.iconCheckedPassword = 'eye';
      this.typeCheck = 'text';
    } else {
      this.iconCheckedPassword = 'eye-off-outline';
      this.typeCheck = 'password';
    }
  }
}
