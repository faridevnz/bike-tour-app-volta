import {
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export function validatePasswordMatch(
  group: FormGroup
): ValidationErrors | null {
  const { password, checkPassword } = group.controls;
  if (password.value === checkPassword.value) {
    return null;
  } else {
    group.get('checkPassword')?.setErrors({ 'password-mismatch': true });
    return { 'password-mismatch': true };
  }
}
