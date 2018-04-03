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

  setAuthenticationToken(token: string) {
    localStorage.setItem('stagecoach.token', token);
  }
}
