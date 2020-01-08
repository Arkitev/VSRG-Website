import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ConnectDatabaseService } from 'src/app/authorization/connect-database.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

export interface CardScore {
  time: string;
  category: string;
  dan: string;
  nickname: string;
  score: number;
  proof: string;
}

export interface CardPendingScore {
  email: string;
  username: string;
  time: string;
  category: string;
  dan: string;
  nickname: string;
  score: number;
  proof: string;
}

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginatorApprovedScores: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginatorWaitingForApproveScores: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) paginatorPendingScores: MatPaginator;
  personalInformationForm: FormGroup;
  changePasswordForm: FormGroup;
  deleteAccountForm: FormGroup;
  jwt: any;
  message: string;
  successEditData: boolean;
  messagePassword: string;
  isAccountDeleted = true;
  successChangePassword: boolean;
  roleIsAdmin: boolean;
  approvedScores: any;
  waitingForApproveScores: any;
  pendingScores: any;
  approvedScoresSource: MatTableDataSource<CardScore>;
  waitingForApproveScoresSource: MatTableDataSource<CardScore>;
  pendingScoresSource: MatTableDataSource<CardPendingScore>;
  obsApprovedScores: Observable<any>;
  obsWaitingForApproveScores: Observable<any>;
  obsPendingScores: Observable<any>;
  hasApprovedScores: boolean;
  hasWaitingForApproveScores: boolean;
  hasPendingScores: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.personalInformationForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      mainGame: ['']
    });
    this.changePasswordForm = this.formBuilder.group({
      id: [],
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.required, this.repeatedPasswordValidator()]]
    });
    this.deleteAccountForm = this.formBuilder.group({
      id: [],
      password: ['', [Validators.required]]
    });
    this.jwt = window.localStorage.getItem('jwt');
        // tslint:disable-next-line: triple-equals
    if (window.localStorage.getItem('role') == 'admin') {
      this.roleIsAdmin = true;
    }
    this.message = null;
    this.messagePassword = null;
    this.setUserData();
    this.setApprovedScores();
    this.setWaitingForApproveScores();
    this.setPendingScores();
  }

  protected setUserData() {
    this.apiService.getUserData(this.jwt).subscribe((data: any) => {
      this.email.setValue(data.email);
      this.username.setValue(data.username);
      this.mainGame.setValue(data.mainGame);
    });
  }

  protected setApprovedScores() {
    const settingScoreData = {
      isScoreApproved: '1',
      jwt: this.jwt
    };
    this.apiService.getScores(settingScoreData).subscribe((data: any) => {
      if (data.length !== 0) {
        this.hasApprovedScores = true;
        this.approvedScores = data;
        this.approvedScoresSource = new MatTableDataSource<CardScore>(this.approvedScores);
        this.approvedScoresSource.paginator = this.paginatorApprovedScores;
        this.obsApprovedScores = this.approvedScoresSource.connect();
      }
    });
  }

  protected setWaitingForApproveScores() {
    const settingScoreData = {
      isScoreApproved: '2',
      jwt: this.jwt
    };
    this.apiService.getScores(settingScoreData).subscribe((data: any) => {
      if (data.length !== 0) {
        this.hasWaitingForApproveScores = true;
        this.waitingForApproveScores = data;
        this.waitingForApproveScoresSource = new MatTableDataSource<CardScore>(this.waitingForApproveScores);
        this.waitingForApproveScoresSource.paginator = this.paginatorWaitingForApproveScores;
        this.obsWaitingForApproveScores = this.waitingForApproveScoresSource.connect();
      }
    });
  }

  protected setPendingScores() {
    const settingScoreData = {
      isScoreApproved: '3',
      jwt: this.jwt
    };
    this.apiService.getScores(settingScoreData).subscribe((data: any) => {
      if (data.length !== 0) {
        this.hasPendingScores = true;
        this.pendingScores = data;
        this.pendingScoresSource = new MatTableDataSource<CardPendingScore>(this.pendingScores);
        this.pendingScoresSource.paginator = this.paginatorPendingScores;
        this.obsPendingScores = this.pendingScoresSource.connect();
      }
    });
  }

  protected onSavePersonalInformation() {
    const userData = {
      email: this.personalInformationForm.controls.email.value,
      username: this.personalInformationForm.controls.username.value,
      mainGame: this.personalInformationForm.controls.mainGame.value,
      jwt: this.jwt
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

  protected onResetPasswordForm() {
    this.changePasswordForm.reset();
  }

  protected onDeleteAccount() {
    const passwordData = {
      email: this.personalInformationForm.controls.email.value,
      password: this.deleteAccountForm.controls.password.value,
      jwt: this.jwt
    };
    if (confirm('Are you sure to delete your account? This process is irreversible.')) {
      this.apiService.deleteAccount(passwordData).subscribe((data: any) => {
        this.isAccountDeleted = data.isAccountDeleted;
        if (this.isAccountDeleted) {
          window.localStorage.removeItem('jwt');
          window.localStorage.removeItem('role');
          window.location.reload();
        }
      });
    }
  }

  protected onResetDeleteAccountForm() {
    this.deleteAccountForm.reset();
  }

  protected onApproveScore(scoreId: number) {
    const score = {
      scoreID: scoreId,
      approved: true
    };
    if (confirm('Are you sure to approve this score?')) {
      this.apiService.manageScore(score).subscribe((data: any) => {
        window.location.reload();
      });
    }
  }

  protected onDiscardScore(scoreId: number) {
    const score = {
      scoreID: scoreId,
      approved: false
    };
    if (confirm('Are you sure to discard this score?')) {
      this.apiService.manageScore(score).subscribe((data: any) => {
        window.location.reload();
      });
    }
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
  get password() { return this.deleteAccountForm.get('password'); }
}
