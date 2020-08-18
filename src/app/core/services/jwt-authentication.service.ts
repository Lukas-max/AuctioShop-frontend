import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.consts';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtToken } from '../../modules/products/model/jwtToken';
import { AUTH_USER, TOKEN } from './basic-authentication.service';

export const JWT_AUTH_USER = 'jwtAuthUser';
export const JWT_TOKEN = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  private roles: string[] = [];
  constructor(private http: HttpClient) {
  }

  public login(user: string, pass: string): Observable<any>{
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<JwtToken>(`${API_URL}/user`,
      {
        username: user,
        password: pass
      }, { headers: header}).pipe(map(data => {
        sessionStorage.setItem(JWT_AUTH_USER, data.username);
        sessionStorage.setItem(JWT_TOKEN, data.jwt);
        this.roles = data.roles;

        return data;
    }));
  }

  public getAuthenticatedUser(){
    return sessionStorage.getItem(JWT_AUTH_USER);
  }

  public getAuthenticationToken(){
    if (this.getAuthenticatedUser()){
      return sessionStorage.getItem(JWT_TOKEN);
    }
  }

  public isLoggedIn(){
    const user = sessionStorage.getItem(JWT_AUTH_USER);
    return !(user === null);
  }

  public isAdminLoggedIn(){
    return !!this.roles.find(role => role === 'ROLE_ADMIN');
  }

  public logout(){
    this.roles = [];
    sessionStorage.clear();
  }
}
