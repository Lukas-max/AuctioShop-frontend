import { Component, OnInit } from '@angular/core';
import {JwtAuthenticationService} from '../../services/jwt_auth/jwt-authentication.service';
import {Router} from '@angular/router';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {CartService} from '../../../products/services/cart.service';

@Component({
  selector: 'app-jwtlogin',
  templateUrl: './jwt-login.component.html',
  styleUrls: ['./jwt-login.component.css']
})
export class JwtLoginComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean = false;
  loginAttempt: boolean = false;

  constructor(private jwtAuthService: JwtAuthenticationService,
              private router: Router,
              private messageToastrService: MessageToastrService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartFromStorage();
  }

  /**
   * On login submit set loginAttempt to true. This will hide the form and show loading spinner.
   * On proper login navigate to home page and display pop up message.
   * When login unsuccessful -> erase login form, show error tab, hide spinnder and show clean login form.
   */
  handleJwtLogin() {
    this.loginAttempt = true;
    this.jwtAuthService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/']);
      this.messageToastrService.success('Zalogowano pomyślnie');
    }, () => {
      this.username = '';
      this.password = '';
      this.loginAttempt = false;
      this.loginError = true;
    });
  }
}
