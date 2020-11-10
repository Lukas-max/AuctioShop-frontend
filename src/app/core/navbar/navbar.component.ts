import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../services/basic_auth/basic-authentication.service';
import { JwtAuthenticationService } from '../services/jwt_auth/jwt-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router,
              public basicAuthenticationService: BasicAuthenticationService,
              public jwtAuthenticationService: JwtAuthenticationService) {
  }

  ngOnInit(): void {
  }

  public search(input: string) {
    // this.route.navigateByUrl(`searchBar/${input}`);
    this.route.navigate(['searchBar', input]);
  }

  public getLoggedUserId(): number{
    return this.jwtAuthenticationService.getAuthenticatedUserId();
  }

  public logout() {
    this.basicAuthenticationService.logout();
  }

  public jwtAuthLogout(){
    this.jwtAuthenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this.jwtAuthenticationService.isLoggedIn();
  }

  public isAdminLogged(): boolean {
    return this.jwtAuthenticationService.isAdminLoggedIn();
  }
}
