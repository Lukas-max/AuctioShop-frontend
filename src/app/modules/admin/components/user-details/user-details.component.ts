import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/model/user';
import {MessageToastrService} from '../../../../core/services/toastr/message-toastr.service';
import {CartService} from '../../../products/services/cart.service';
import { Location } from '@angular/common';

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
  screenWidth = window.innerWidth;

  constructor(
    private userService: UsersService,
    private messageToastrService: MessageToastrService,
    private cartService: CartService,
    private location: Location) { }

  ngOnInit(): void {
    this.page = 1;
    this.size = 20;
    this.getUsers();
    this.cartService.getCartFromStorage();
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

  public deleteUser(user: User){
    if (confirm('Czy chcesz na pewno usunąć użytkownika: ' + user.username + '?')){
      this.deleteUserById(user.id);
    }
  }

  private deleteUserById(id: number) {
    this.userService.deleteUserByUserId(id).subscribe(() => {
      this.getUsers();
      this.messageToastrService.success('Pomyślnie usunięto użytkownika u mumerze: ' + id);
    });
  }

  public goBack(){
    this.location.back();
  }
}
