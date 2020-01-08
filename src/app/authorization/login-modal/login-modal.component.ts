import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConnectDatabaseService } from '../connect-database.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  message: string;
  jwt: any;
  keepLogged = false;

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
      password: this.loginForm.controls.password.value,
      keepLogged: this.keepLogged
    };

    this.apiService.login(loginData).subscribe((data: any) => {
        this.message = data.message;
        if (data.jwt) {
          window.location.reload();
          window.localStorage.setItem('jwt', data.jwt);
          window.localStorage.setItem('role', data.role);
          this.jwt = data.jwt;
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

  protected onKeepLogged() {
    this.keepLogged = true;
  }


  protected openRegistrationModal() {
    this.onReset();
    $('#registrationModal').appendTo('body').modal('show');
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
