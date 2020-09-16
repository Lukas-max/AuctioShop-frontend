import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MessageToastrService} from '../../../../core/services/message-toastr.service';
import {Router} from '@angular/router';
import {User} from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  checkUser: string;

  constructor(private userService: UsersService,
              private route: Router,
              private messageToastrService: MessageToastrService) {
  }

  ngOnInit(): void {
  }

  public register() {
    this.userService.createUser({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe(() => {
      this.username = null;
      this.password = null;
      this.route.navigate(['products']);
      this.messageToastrService.success('Zarejestrowano użytkownika');
    }, error => {
      // console.log(error);
    });
  }

  public register1() {
    this.userService.getUserByName(this.username).subscribe(data => {
      this.checkUser = data.username;
      if (this.checkUser === null) {
        // this.createUserInDatabase();
      } else {
        this.messageToastrService.error('Użytkownik już istnieje w bazie danych');
      }
    }, error => {
      console.log(error);
    });
  }

  private createUserInDatabase() {
    this.userService.createUser({
      username: this.username,
      password: this.password,
      email: this.email
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
