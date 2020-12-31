/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../app.consts';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl: string = 'api/users';
  constructor(private http: HttpClient) {
  }

  //get page of users:
  public fetchUsers(page: number, size: number) {
    const httpOptions = {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    }
    return this.http.get(`${API_URL}/${this.usersUrl}`, httpOptions);
  }

  public fetchUserOrders(page: number, size: number, id: number){
    const httpOptions = {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    }
    return this.http.get(`${API_URL}/${this.usersUrl}/${id}`, httpOptions)
  }

  /**
   * It will delete all user data. Customer orders and addresses.
   */
  public deleteUserByUserId(id: number){
    return this.http.delete(`${API_URL}/${this.usersUrl}/${id}`)
  }

  // register user:
  public createUser(user: User) {
    return this.http.post(`${API_URL}/${this.usersUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error){
    return throwError(error);
  }
}
