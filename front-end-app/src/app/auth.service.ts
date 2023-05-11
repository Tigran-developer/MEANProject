import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  user: any;

  constructor(private http: HttpClient) {
  }

  registerUser(user: any) {
    let headers = new HttpHeaders()
    console.log(user)
    headers.append('Content-Type', 'application/json')
    return this.http.post(
      'http://localhost:3000/account/reg', user,
      {headers})
  }

  authUser(user: any) {
    console.log("authUser")
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post(
      'http://localhost:3000/account/auth', user,
      {headers})
  }

  storeUser(token: any, user: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(this.token);
  }
}
