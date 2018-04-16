import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../shared/services/auth.service";
import { JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  protected registerForm: FormGroup;
  protected email: string;

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) { }

  register() {
    console.log("Even registreren hoor");
    this.authService.register(this.email, this.registerForm.value.firstpass, this.registerForm.value.firstName,
      this.registerForm.value.middleName, this.registerForm.value.lastName, this.registerForm.value.phone)
      .subscribe((response: any) => {
        const decoded = (this.jwtHelper.decodeToken(response.token));
        const expiresOn = decoded.exp;
        this.authService.setAuthenticationToken(response.token);
        this.authService.setTokenExpireDate(expiresOn);
      }, (err: any) => {
        this.handleUnauthorizedError(err);
      });
  }

  handleUnauthorizedError(err: any){
    console.log(err);
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      mail: new FormControl('', Validators.required),
      passwords: new FormGroup({
        firstpass: new FormControl('', Validators.required),
        secondpass: new FormControl('', Validators.required)
      }, this.passwordMatchValidator),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  studentMail() {
    if (this.registerForm.get('mail').value.includes("s") && this.registerForm.get('mail').value.replace(/[^0-9]/g,"").length == 7) {
      this.email = this.registerForm.get('mail').value + '@student.hsleiden.nl';
      return true;
    } else {
      this.email = this.registerForm.get('mail').value + '@hsleiden.nl';
      return false;
    }
  }

  passwordMatchValidator(g: FormGroup) {
    if (g.get('firstpass').value === g.get('secondpass').value){
      if (!g.get('firstpass').valid || !g.get('secondpass').valid){
        g.get('firstpass').setErrors(null);
        g.get('secondpass').setErrors(null);
        return null;
      }
    } else {
      console.log("fouaaat");
      g.get('firstpass').setErrors({'mismatch': true});
      g.get('secondpass').setErrors({'mismatch': true});
      return {'mismatch': true};
    }
  }

}
