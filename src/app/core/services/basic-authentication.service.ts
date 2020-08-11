import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

    return this.http.get('http://localhost:8080/user',
      { headers: header}).pipe(map(data => {
        sessionStorage.setItem('authenticatedUser', username);
        sessionStorage.setItem('token', basicAuthHeader);
        return data;
    }));
  }

  public getAuthenticatedUser(){
    return sessionStorage.getItem('authenticatedUser');
  }

  public getAuthenticationToken(){
    if (this.getAuthenticatedUser()){
      return sessionStorage.getItem('token');
    }
  }

  public isUserLoggedIn(){
    const user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  public logout(){
    sessionStorage.clear();
  }
}

