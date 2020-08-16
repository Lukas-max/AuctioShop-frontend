import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../app.consts';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  // register user:
  public createUser(user: User) {
    return this.http.post(`${API_URL}/api/users/register`, user);
  }
}
