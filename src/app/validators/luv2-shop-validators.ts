import { FormControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    // check if the string only contains whitespace
    if (control.value != null && control.value.trim().length === 0) {
      // invalid , return erro object
      return { notOnlyWhitespace: true };
    } else {
    return null;}
  }
}
