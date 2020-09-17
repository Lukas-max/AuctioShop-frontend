import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MessageToastrService} from '../../../../core/services/message-toastr.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatchValidationService} from '../../../../shared/services/match-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registration: FormGroup;

  constructor(private userService: UsersService,
              private route: Router,
              private messageToastrService: MessageToastrService,
              private formBuilder: FormBuilder,
              private matchValidation: MatchValidationService) {
  }

  ngOnInit(): void {
    this.registration = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.matchValidation.validate('password', 'confirmPassword')
    });
  }

  public register() {
    console.log(this.registration.controls);
    this.userService.createUser({
      username: this.registration.value.username,
      password: this.registration.value.password,
      email: this.registration.value.email
    }).subscribe(() => {
      this.registration.reset();
      this.route.navigate(['products']);
      this.messageToastrService.success('Zarejestrowano użytkownika');
    }, error => {
      //   nothing
    });
  }

  get username() {
    return this.registration.get('username');
  }

  get password() {
    return this.registration.get('password');
  }

  get email() {
    return this.registration.get('email');
  }

  get confirmPassword() {
    return this.registration.get('confirmPassword');
  }
}
