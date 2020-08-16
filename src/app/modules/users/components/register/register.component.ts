import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MessageToastrService} from '../../../../core/services/message-toastr.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;

  constructor(private userService: UsersService,
              private route: Router,
              private messageToastrService: MessageToastrService) { }

  ngOnInit(): void {
  }

  public register(){
    this.userService.createUser({
      username: this.username,
      password: this.password
    }).subscribe(() => {
      this.username = null;
      this.password = null;
      this.route.navigate(['products']);
      this.messageToastrService.success('Zarejestrowano użytkownika');
    }, error => {
      console.log(error);
    });
  }
}
