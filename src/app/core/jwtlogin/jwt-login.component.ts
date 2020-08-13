import { Component, OnInit } from '@angular/core';
import {JwtAuthenticationService} from '../services/jwt-authentication.service';
import {Router} from '@angular/router';
import {MessageToastrService} from '../services/message-toastr.service';

@Component({
  selector: 'app-jwtlogin',
  templateUrl: './jwt-login.component.html',
  styleUrls: ['./jwt-login.component.css']
})
export class JwtLoginComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean;

  constructor(private jwtAuthService: JwtAuthenticationService,
              private router: Router,
              private messageToastrService: MessageToastrService) { }

  ngOnInit(): void {
    this.loginError = false;
  }

  handleJwtLogin() {
    this.jwtAuthService.login(this.username, this.password).subscribe(data => {
      this.router.navigate(['products']);
      this.messageToastrService.success('Zalogowano pomyślnie');
    }, error => {
      this.loginError = true;
      console.log(error);
    });
  }
}
