import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  protected token: string;
  protected outcome: boolean;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.outcome = true;
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
    setTimeout(this.verifyAccount(), 8000);
  }

  verifyAccount() {
    this.accountService.verifyAccount(this.token)
      .subscribe((response: any) => {
        this.router.navigate(['/auth/login']);
      }, (err: any) => {
        console.log("Er gaat iets mis");
        this.outcome = false;
      })
  }

}
