import { Component, OnInit } from '@angular/core';
import {BasicAuthenticationService} from '../services/basic-authentication.service';
import {Router} from '@angular/router';
import {MessageToastrService} from '../services/message-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginValid: boolean;
  loginError: boolean;
  username: string;
  password: string;

  constructor(
    private basicAuthenticationService: BasicAuthenticationService,
    private router: Router,
    private messageToastrService: MessageToastrService) { }

  ngOnInit(): void {
    this.loginValid = false;
    this.loginError = false;
  }

  public handleBasicLogin(){
    this.basicAuthenticationService.login(this.username, this.password).subscribe(data => {
      this.loginValid = true;
      this.router.navigate(['/products']);
      this.messageToastrService.success('Zalogowano pomyślnie.');
    },
      error => {
      this.loginValid = false;
      this.loginError = true;
      console.log(error);
      });
  }
}
