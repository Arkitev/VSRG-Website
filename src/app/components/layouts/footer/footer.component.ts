import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  emailText = 'arkitevg@gmail.com';

  constructor() { }

  ngOnInit() {
  }

  protected copyEmail(emailText: any) {
    emailText.select();
    document.execCommand('copy');
    emailText.setSelectionRange(0, 0);
  }
}
