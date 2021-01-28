import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL, USER_LOGIN_URL} from '../../../app.consts';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../../model/authenticationResponse';
import {Authority} from '../../model/authority';

export const JWT_AUTH_USER = 'jwtAuthUser';
export const JWT_TOKEN = 'jwtToken';
export const JWT_USER_ID = 'jwtUserId';
export const JWT_ADMIN_ROLE = 'jwtAdminRole';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private http: HttpClient) {
  }

  public login(user: string, pass: string): Observable<any> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<AuthenticationResponse>(`${API_URL}/${USER_LOGIN_URL}`,
      {
        username: user,
        password: pass
      }, {headers: header}).pipe(map(data => {
      this.storeLoggedData(data);
      return data;
    }));
  }

  private storeLoggedData(data: AuthenticationResponse) {
    sessionStorage.setItem(JWT_AUTH_USER, data.username);
    sessionStorage.setItem(JWT_TOKEN, data.jwt);
    sessionStorage.setItem(JWT_USER_ID, data.userId.toString());

    const isAdmin: boolean = data.authorities.some(auth => auth.authority === `ADMIN`);
    isAdmin && sessionStorage.setItem(JWT_ADMIN_ROLE, `ADMIN`);
  }

  public getAuthenticatedUser() {
    return sessionStorage.getItem(JWT_AUTH_USER);
  }

  public getAuthenticatedUserId() {
    let userId: number;
    if (this.isLoggedIn()) {
      userId = +sessionStorage.getItem(JWT_USER_ID);
    }
    return userId;
  }

  public getAuthenticationToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(JWT_TOKEN);
    }
  }

  public isLoggedIn() {
    const user = sessionStorage.getItem(JWT_AUTH_USER);
    return !(user === null);
  }

  public isAdminLoggedIn() {
    const sessionRole = sessionStorage.getItem(JWT_ADMIN_ROLE);
    return sessionRole === `ADMIN`;
  }

  public logout() {
    sessionStorage.removeItem(JWT_AUTH_USER);
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(JWT_USER_ID);
    sessionStorage.removeItem(JWT_ADMIN_ROLE);
    // sessionStorage.clear();
  }
}
