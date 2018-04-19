import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  private API_URL = environment.api_url;

  login(email: string, password: string) {
    const data = {email, password};
    return this.httpClient.post<any>(this.API_URL + '/users/login', data);
  }

  register(id: string, email: string, password: string, firstName: string, middleName: string, lastName: string, phone: string, roleTitle: string) {
    const userId = id;
    const data = {id, email, password, firstName, middleName, lastName, phone, roleTitle, userId};
    return this.httpClient.post<any>(this.API_URL + '/users/signup', data);
  }

  setAuthenticationToken (token: string) {
    localStorage.setItem('stagecoach.token', token);
  }

  getAuthenticationToken () {
    return localStorage.getItem('stagecoach.token');
  }

  setTokenExpireDate (expiresOn: number) {
    const date: any = new Date(1000 * expiresOn).toUTCString();
    console.log(date);
    localStorage.setItem('stagecoach.expireDate', date);
  }

  getTokenExpireDate () {
    return localStorage.getItem('stagecoach.expireDate');
  }
}
