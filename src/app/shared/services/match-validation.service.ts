import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MatchValidationService {

  constructor() { }

  /**
   *
   * @param control1 - in this case it's password from register template
   * @param control2 - in this casie it's confirmPassword from register template
   *   It will validate second password only if it has no other validation errors.
   */
  validate(control1: string, control2: string){
    return (form: FormGroup) => {
      const first = form.controls[control1];
      const second = form.controls[control2];

      if (second.errors){
        return null;
      }

      if (first.value !== second.value){
        second.setErrors({mustMatch: true});
      }else{
        second.setErrors(null);
      }
    };
  }
}
