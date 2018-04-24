import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountService {

  private API_URL = environment.api_url;
  private user: BehaviorSubject<any> = JSON.parse(localStorage.getItem('stagecoach.user'));

  constructor(private httpClient: HttpClient) {}

  getAccountDetails() {
    return this.httpClient.get(this.API_URL + '/account');
  }

  requestRecoverEmail(email: string) {
    const data = { email: email };
    return this.httpClient.post(this.API_URL + '/account/recover', data);
  }

  resetPasswordWithToken(token: string, password: string) {
    const data = {token: token, password: password};
    return this.httpClient.post(this.API_URL + '/account/reset', data);
  }

  updateAccountInfo(accountInfo: any) {
    const id = JSON.parse(localStorage.getItem('stagecoach.user')).id;
    return this.httpClient.put(this.API_URL + '/users/' + id, accountInfo);
  }

  verifyAccount(token: string) {
    const data = {token: token};
    return this.httpClient.post(this.API_URL + '/account/verify', data);
  }
}
