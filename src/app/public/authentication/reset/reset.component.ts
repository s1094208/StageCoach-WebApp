import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../shared/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../../shared/validators/match_password.validator';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ResetComponent implements OnInit {

  protected token: string;
  protected resetForm: FormGroup;

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
      'token': new FormControl(null, [Validators.required, Validators.minLength(16), Validators.maxLength(32)]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)]),
      'passwordRepeat': new FormControl(null, [Validators.required, matchOtherValidator('password')]),
    });

    this.route.params.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.resetForm.get('token').setValue(this.token);
        this.resetForm.get('token').disable();
      }
    });
  }

  onSubmit() {
    this.accountService.resetPasswordWithToken(
      this.resetForm.get('token').value,
      this.resetForm.get('password').value
    ).subscribe((response: any) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
