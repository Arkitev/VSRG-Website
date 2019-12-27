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
    if (confirm('Are you sure you want to sign out? :(')) {
      window.localStorage.removeItem('jwt');
      window.location.reload();
    }
  }

  public isJwtSet(): boolean {
    if (window.localStorage.getItem('jwt')) {
      return true;
    }
  }

  public openLoginModal() {
    $('#loginModal').appendTo('body').modal('show');
  }

  public openRegistrationModal() {
    $('#registrationModal').appendTo('body').modal('show');
  }

}
