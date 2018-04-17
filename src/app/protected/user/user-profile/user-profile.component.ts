import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  protected user: any;
  protected editUserInfoForm: FormGroup;

  protected requestPasswordChangeButtonDisabled = false;
  protected requestPasswordChangeStatus: boolean = undefined;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.user = data.user;
    });

    this.editUserInfoForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null, []),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required]),
      'linkedIn': new FormControl(null, []),
      'createdAt': new FormControl(null, []),
      'updatedAt': new FormControl(null, []),
    });

    this.editUserInfoForm.disable();
    this.setUserInfoFormValues(this.user);
  }

  setFormEditable() {
    this.editUserInfoForm.enable();
    this.editUserInfoForm.get('createdAt').disable();
    this.editUserInfoForm.get('updatedAt').disable();
    this.editUserInfoForm.get('email').disable();
  }

  setFormDisabled() {
    this.setUserInfoFormValues(this.user);
    this.editUserInfoForm.disable();
  }

  saveUserInfoChanges() {

    const user = {
      id: this.user.id,
      firstName: this.editUserInfoForm.get('firstName').value,
      middleName: this.editUserInfoForm.get('middleName').value,
      lastName: this.editUserInfoForm.get('lastName').value,
      phone: this.editUserInfoForm.get('phone').value,
      linkedIn: this.editUserInfoForm.get('linkedIn').value,
    };

    this.accountService.updateAccountInfo(user).subscribe((response: any) => {
        this.editUserInfoForm.reset();
        this.editUserInfoForm.disable();
        Object.assign(this.user, response.user);
        this.setUserInfoFormValues(this.user);
        this.userService.setCurrentUser(this.user);
    });
  }

  requestPasswordChange() {
    this.requestPasswordChangeButtonDisabled = true;
    this.accountService.requestRecoverEmail(this.user.account.email).subscribe((response: any) => {

      if (response.error) {
        this.requestPasswordChangeStatus = false;
      } else {
        this.requestPasswordChangeStatus = true;
      }

      setTimeout(() => {
        this.requestPasswordChangeStatus = undefined;
        this.requestPasswordChangeButtonDisabled = false;
      }, 5000);
    });
  }

  setUserInfoFormValues(user: any) {
    this.editUserInfoForm.reset();
    this.editUserInfoForm.get('firstName').setValue(user.firstName);
    this.editUserInfoForm.get('middleName').setValue(user.middleName);
    this.editUserInfoForm.get('lastName').setValue(user.lastName);
    this.editUserInfoForm.get('email').setValue(user.account.email);
    this.editUserInfoForm.get('phone').setValue(user.phone);
    this.editUserInfoForm.get('linkedIn').setValue(user.linkedIn);
    this.editUserInfoForm.get('createdAt').setValue(new Date(user.account.createdAt).toDateString());
    this.editUserInfoForm.get('updatedAt').setValue(new Date(user.account.updatedAt).toDateString());
  }


}
