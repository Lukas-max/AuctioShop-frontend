import {Component, OnInit} from '@angular/core';
import {JwtAuthenticationService} from './modules/auth/services/jwt_auth/jwt-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shop-frontend';

  constructor(private jwtAuthenticationService: JwtAuthenticationService) {
  }

  /**
   * On app startup code checks if the logged user token is still valid. If it' expiration day has passed, the user is logged out.
   */
  ngOnInit(): void {
    if (!this.jwtAuthenticationService.isLoggedIn()) return;

    const time = this.jwtAuthenticationService.getTokenExpirationTime();
    if (+time - +new Date() < 0){
      this.jwtAuthenticationService.logout();
    }
  }
}
