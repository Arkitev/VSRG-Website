import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public logOut() {
    window.localStorage.removeItem('jwt');
    alert('You have been logged out.');
  }

  public isJwtSet(): boolean {
    if (window.localStorage.getItem('jwt')) {
      return true;
    } else {
      return false;
    }
  }

  public openLoginModal() {
      $('#loginModal').modal('show');
  }

  public openRegistrationModal() {
    $('#registrationModal').modal('show');
  }

}
