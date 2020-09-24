import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../app.consts';

export const TOKEN = 'token';
export const AUTH_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string){
    const basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
    const header = new HttpHeaders({
      Authorization: basicAuthHeader
    });

    return this.http.get(`${API_URL}/user`,
      { headers: header}).pipe(map(data => {
        sessionStorage.setItem(AUTH_USER, username);
        sessionStorage.setItem(TOKEN, basicAuthHeader);
        return data;
    }));
  }

  public getAuthenticatedUser(){
    return sessionStorage.getItem(AUTH_USER);
  }

  public getAuthenticationToken(){
    if (this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN);
    }
  }

  public isLoggedIn(){
    const user = sessionStorage.getItem(AUTH_USER);
    return !(user === null);
  }

  public logout(){
    sessionStorage.clear();
  }
}

