import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

/*
  Voegt bij alle uitgaande requests die niet in de unauthroizedUrls array staan een Authorization header toe.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private API_URL = environment.api_url;

  private unauthorizedUrls: Array<String> = [
    this.API_URL + '/users/login',
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add a custom header
    let authorizedRequest;
    if (this.unauthorizedUrls.indexOf(request.url) === -1) {
      authorizedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('stagecoach.token'))
      });
      return next.handle(authorizedRequest);
    } else {
      return next.handle(request);
    }
  }
}
