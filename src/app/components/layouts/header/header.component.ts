import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public logOut() {
    if (confirm('Are you sure you want to sign out? :(')) {
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('role');
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

  protected goToSubmitForm() {
    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
    setTimeout(() => window.scrollTo(0, 99999), 1);
  }

}
