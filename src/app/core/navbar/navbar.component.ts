import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BasicAuthenticationService} from '../services/basic-authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router,
    public basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }
  public search(input: string){
    this.route.navigateByUrl(`searchBar/${input}`);
  }

  public logout(){
    this.basicAuthenticationService.logout();
  }
}
