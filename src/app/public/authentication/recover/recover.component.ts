import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AccountService} from "../../../shared/services/account.service";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RecoverComponent implements OnInit {

  protected recoverForm: FormGroup;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.recoverForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  };

  onSubmit() {
    this.accountService.requestRecoverEmail(this.recoverForm.value.email)
      .subscribe((response: any) => {
        console.log(response);
      });
  };

}
