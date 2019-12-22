import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectDatabaseService } from '../connect-database.service';
import * as bootstrap from 'bootstrap';
import { element } from 'protractor';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  message: string;
  public jwt: any = null;


  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  protected onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

    this.apiService.login(loginData).subscribe((data: any) => {
        this.message = data.message;

        if (data.jwt) {
          this.jwt = data.jwt;
          window.localStorage.setItem('jwt', data.jwt);
          $('#loginModal').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').fadeOut(150);
          this.onReset();
          alert('Successful login!');
        } else {
          this.invalidLogin = true;
        }
   });
  }

  protected onReset() {
    this.loginForm.reset();
    this.message = null;
  }

  protected isJwtSet(): boolean {
    if (this.jwt !== null) {
      return true;
    } else {
      return false;
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
