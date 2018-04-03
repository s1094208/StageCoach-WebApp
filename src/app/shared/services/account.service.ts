import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AccountService {

  private API_URL = environment.api_url;
  private user = new BehaviorSubject<any>(undefined);

  constructor(private httpClient: HttpClient) {}

  getAccountDetails() {
    return this.httpClient.get(this.API_URL + '/account');
  }

  storeAccountDetails(user: Object) {
    this.user.next(user);
  }
}
