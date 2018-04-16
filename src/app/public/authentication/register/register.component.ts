import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  protected registerForm: FormGroup;

  constructor() { }

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
      console.log(this.registerForm.get('mail'));
      return true;
    } else {
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
