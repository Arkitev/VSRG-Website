import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  personalInformationForm: FormGroup;
  changePasswordForm: FormGroup;
  jwt: any;
  message: string;
  messagePassword: string;
  successEditData: boolean;
  successChangePassword: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.personalInformationForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      mainGame: ['---']
    });

    this.changePasswordForm = this.formBuilder.group({
      id: [],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.required, this.repeatedPasswordValidator()]]
    });

    this.jwt = localStorage.getItem('jwt');
    this.message = null;
    this.messagePassword = null;
    this.setUserData();
  }

  protected onSavePersonalInformation() {
    const userData = {
      email: this.personalInformationForm.controls.email.value,
      username: this.personalInformationForm.controls.username.value,
      mainGame: this.personalInformationForm.controls.mainGame.value
    };

    this.apiService.editUserData(userData).subscribe((data: any) => {
      this.message = data.message;
      this.successEditData = data.successEditData;

      if (data.jwt) {
        window.localStorage.setItem('jwt', data.jwt);
        this.jwt = data.jwt;
      }
    });
  }

  protected onChangePassword() {
    const userPasswordData = {
      email: this.personalInformationForm.controls.email.value,
      currentPassword: this.changePasswordForm.controls.currentPassword.value,
      newPassword: this.changePasswordForm.controls.newPassword.value
    };

    this.apiService.changePassword(userPasswordData).subscribe((data: any) => {
      this.messagePassword = data.messagePassword;
      this.successChangePassword = data.successChangePassword;
    });
  }

  protected setUserData() {
    this.apiService.getUserData(this.jwt).subscribe((data: any) => {
      this.email.setValue(data.email);
      this.username.setValue(data.username);
      this.mainGame.setValue(data.mainGame);
    });
  }

  protected onReset() {
    this.changePasswordForm.reset();
  }

  protected repeatedPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let invalid = false;

      if (this.changePasswordForm && this.changePasswordForm.get('newPassword')
      && this.changePasswordForm.get('newPassword').value !== control.value) {
        invalid = true;
      }

      return invalid ? { repeatedPassword: { value: control.value } } : null;
    };
  }

  get email() { return this.personalInformationForm.get('email'); }
  get username() { return this.personalInformationForm.get('username'); }
  get mainGame() { return this.personalInformationForm.get('mainGame'); }

  get currentPassword() { return this.changePasswordForm.get('currentPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
  get repeatedPassword() { return this.changePasswordForm.get('repeatedPassword'); }

}
