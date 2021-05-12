import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL, JWT_ADMIN_ROLE, JWT_AUTH_USER, JWT_EXPIRATION, JWT_TOKEN, JWT_USER_ID, USER_LOGIN_URL} from '../../../../app.consts';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../../model/authenticationResponse';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(user: string, pass: string): Observable<any> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<AuthenticationResponse>(`${API_URL}/${USER_LOGIN_URL}`,
      {
        username: user,
        password: pass
      }, {headers: header}).pipe(tap(data => this.storeLoggedData(data)
    ));
  }

  private storeLoggedData(data: AuthenticationResponse) {
    localStorage.setItem(JWT_AUTH_USER, data.username);
    localStorage.setItem(JWT_TOKEN, data.jwt);
    localStorage.setItem(JWT_USER_ID, data.userId.toString());
    localStorage.setItem(JWT_EXPIRATION, data.tokenExpiration.toString());

    const isAdmin: boolean = data.authorities.some(auth => auth.authority === `ADMIN`);
    isAdmin && localStorage.setItem(JWT_ADMIN_ROLE, `ADMIN`);
  }

  public getAuthenticatedUser() {
    return localStorage.getItem(JWT_AUTH_USER);
  }

  public getAuthenticatedUserId() {
    let userId: number;
    if (this.isLoggedIn()) {
      userId = +localStorage.getItem(JWT_USER_ID);
    }
    return userId;
  }

  public getAuthenticationToken() {
    if (this.getAuthenticatedUser()) {
      return localStorage.getItem(JWT_TOKEN);
    }
  }

  public isLoggedIn() {
    const user = localStorage.getItem(JWT_AUTH_USER);
    return user !== null;
  }

  public isAdminLoggedIn() {
    const sessionRole = localStorage.getItem(JWT_ADMIN_ROLE);
    return sessionRole === `ADMIN`;
  }

  /**
   * On app startup code checks if the logged user token is still valid. If it' expiration day has passed, the user is logged out.
   */
  public logoutWhenTokenExpired() {
    if (!this.isLoggedIn()) {
      return;
    }

    const time = this.getTokenExpirationTime();
    if (+time - +new Date() < 0) {
      this.logout();
    }
  }

  public logout() {
    localStorage.removeItem(JWT_AUTH_USER);
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(JWT_USER_ID);
    localStorage.removeItem(JWT_ADMIN_ROLE);
    this.router.navigate(['/']);
  }

  private getTokenExpirationTime(): Date {
    const date = localStorage.getItem(JWT_EXPIRATION);
    return new Date(date);
  }
}
