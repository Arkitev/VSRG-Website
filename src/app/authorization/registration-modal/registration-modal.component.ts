import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ConnectDatabaseService } from '../connect-database.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {

  registrationForm: FormGroup;
  message: string;
  successRegist: boolean;


  constructor(private formBuilder: FormBuilder, private apiService: ConnectDatabaseService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.required, this.repeatedPasswordValidator()]],
      mainGame: ['', [Validators.required]],
      acceptRules: [false, [Validators.pattern('true')]]
    });
  }

  protected onSubmit() {
    this.apiService.createUser(this.registrationForm.value).subscribe((data: any) => {
      this.message = data.message;
      this.successRegist = data.successRegist;

      if (this.successRegist) {
        $('#registrationModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').fadeOut(150);
        this.onReset();
        alert('Accout has been successfully created!');
      }
    });
  }

  protected onReset() {
    // $('#mainGame').val('---');
    this.registrationForm.reset();
    this.acceptRules.setValue(false);
    this.message = null;
    this.successRegist = false;
  }

  protected openLoginModal() {
    this.onReset();
    $('#loginModal').appendTo('body').modal('show');
  }

  protected repeatedPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let invalid = false;

      if (this.registrationForm && this.registrationForm.get('password')
      && this.registrationForm.get('password').value !== control.value) {
        invalid = true;
      }

      return invalid ? { repeatedPassword: { value: control.value } } : null;
    };
  }

  get email() { return this.registrationForm.get('email'); }
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }
  get repeatedPassword() { return this.registrationForm.get('repeatedPassword'); }
  get mainGame() { return this.registrationForm.get('mainGame'); }
  get acceptRules() { return this.registrationForm.get('acceptRules'); }
}
