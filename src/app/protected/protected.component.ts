import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

  protected user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  }

}
