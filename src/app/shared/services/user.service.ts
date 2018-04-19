import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private API_URL = environment.api_url;
  private user: BehaviorSubject<any>;

  constructor(private httpClient: HttpClient) {
    this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('stagecoach.user')));
  }

  getUserById(id: string) {
    return this.httpClient.get(this.API_URL + '/users/' + id);
  }

  setCurrentUser(user: Object) {
    this.user.next(user);
    localStorage.setItem('stagecoach.user', JSON.stringify(user));
  }

  getCurrentUser(): BehaviorSubject<any> {
    return this.user;
  }
}
