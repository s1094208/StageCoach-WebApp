import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class UserResolve implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUserById(route.paramMap.get('id'));
  }
}
