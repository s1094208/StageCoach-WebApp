import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../shared/services/account.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('submit') submitButton: ElementRef;

  protected loginForm: FormGroup;
  protected authenticationError;


  constructor(private authService: AuthService,
              private accountService: AccountService,
              private router: Router,
              private jwtHelper: JwtHelperService,
              private userService: UserService) {
  }

  login() {
    this.submitButton.nativeElement.innerHTML = '<img src="./assets/icons/loading_spinner.gif" height="20px" wdith="20px">';
    this.submitButton.nativeElement.disabled = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((response: any) => {
        const decoded = (this.jwtHelper.decodeToken(response.token));
        const expiresOn = decoded.exp;
        this.authService.setAuthenticationToken(response.token);
        this.authService.setTokenExpireDate(expiresOn);
        this.accountService.getAccountDetails()
          .subscribe((user: any) => {
            this.userService.setCurrentUser(user);

            if (user.roles.indexOf('Student') >= 0) {
              this.router.navigate(['/secure/students/dashboard']);
            } else if (user.roles.length > 0) {
              console.log('Yo\'re not a student');
            }
          });
      }, (err: any) => {
          this.handleUnauthorizedError(err);
      });
  }

  handleUnauthorizedError(err: any) {
    this.submitButton.nativeElement.innerHTML = 'Log in';
    this.submitButton.nativeElement.disabled = false;
    this.authenticationError = 'Username or password invalid!';
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email] ),
      'password': new FormControl(null, Validators.required),
    });
  }
}
