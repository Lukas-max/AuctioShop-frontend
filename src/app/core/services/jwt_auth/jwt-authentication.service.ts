import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../app.consts';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtToken } from '../../../modules/products/model/jwtToken';
import { AUTH_USER, TOKEN } from '../basic_auth/basic-authentication.service';

export const JWT_AUTH_USER = 'jwtAuthUser';
export const JWT_TOKEN = 'jwtToken';
export const JWT_USER_ID = 'jwtUserId';
export const JWT_USER_ROLES = 'jwtUserRoles';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

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
        sessionStorage.setItem(JWT_USER_ID, data.userId.toString());
        sessionStorage.setItem(JWT_USER_ROLES, data.roles.toString());

        return data;
    }));
  }

  public getAuthenticatedUser(){
    return sessionStorage.getItem(JWT_AUTH_USER);
  }

  public getAuthenticatedUserId(){
    let userId: number;
    if (this.isLoggedIn()){
      userId = +sessionStorage.getItem(JWT_USER_ID);
    }
    return userId;
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
    const role = sessionStorage.getItem(JWT_USER_ROLES);
    return role === 'ROLE_ADMIN';
  }

  public logout(){
    sessionStorage.removeItem(JWT_AUTH_USER);
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(JWT_USER_ID);
    sessionStorage.removeItem(JWT_USER_ROLES);
    // sessionStorage.clear();
  }
}
