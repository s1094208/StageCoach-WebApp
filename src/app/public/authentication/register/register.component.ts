import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../shared/services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  email: string;
  roleTitle: string;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    let middle = null;
    if (this.registerForm.value.middleName != '') {
      middle = this.registerForm.value.middleName;
    }
    this.authService.register(this.registerForm.value.mail, this.email, this.registerForm.value.passwords['firstpass'], this.registerForm.value.firstName,
      middle, this.registerForm.value.lastName, this.registerForm.value.phone, this.roleTitle)
      .subscribe((response: any) => {
        this.router.navigate(['auth/login']);
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
        firstpass: new FormControl('', [Validators.required, Validators.minLength(8), this.correctPasswordValidator]),
        secondpass: new FormControl('', Validators.required)
      }, this.passwordMatchValidator),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, this.phoneLengthValidator])
    });
  }

  studentMail() {
    if (this.registerForm.get('mail').value.includes("s") && this.registerForm.get('mail').value.replace(/[^0-9]/g,"").length == 7) {
      this.email = this.registerForm.get('mail').value + '@student.hsleiden.nl';
      this.roleTitle = 'Student';
      return true;
    } else {
      this.email = this.registerForm.get('mail').value + '@hsleiden.nl';
      this.roleTitle = 'Monitor';
      return false;
    }
  }

  correctPasswordValidator(c: FormControl) {
    if (/\d/.test(c.value) && /[a-z]/.test(c.value) && /[A-Z]/.test(c.value) && /[!@#$%^&*]/.test(c.value)) {
      return null;
    } else {
      return {'wrongPassword': true};
    }
  }

  passwordMatchValidator(g: FormGroup) {
    if (g.get('firstpass').value === g.get('secondpass').value){
      if (!g.get('firstpass').valid || !g.get('secondpass').valid){
        g.setErrors({'mismatch': false});
        return null;
      }
    } else {
      console.log("fouaaat");
      g.setErrors({'mismatch': true});
      return {'mismatch': true};
    }
  }

  phoneLengthValidator(c: FormControl) {
    if (c.value.length == 10 || c.value.length == 0) {
      return null;
    } else {
      return {'wrongLength': true};
    }
  }

}
