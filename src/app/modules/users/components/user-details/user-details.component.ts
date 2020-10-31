import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: User[];
  page: number;
  size: number;
  totalElements: number;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.getUsers();
  }
// api/users
  public getUsers(){
    this.userService.fetchUsers(this.page - 1, this.size).subscribe(this.processResponse());
  }

  private processResponse(){
    return userData  => {
      this.users = userData.content;
      this.totalElements = userData.totalElements;
    };
  }

}
