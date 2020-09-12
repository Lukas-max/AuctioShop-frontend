/* tslint:disable */
import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../app.consts';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'api/users';
  constructor(private http: HttpClient) {
  }

  // register user:
  public createUser(user: User) {
    return this.http.post(`${API_URL}/${this.usersUrl}/register`, user);
  }

  // check if user exists, RegisterComponent:
  public getUserByName(username: string){
    const httpOptions = {
      params: { 'username': username }
    };

    return this.http.get<any>(`${API_URL}/${this.usersUrl}/user`, httpOptions);
  }
}
