import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end';

  constructor (private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isAuthenticated();
    if (this.auth._isAuth$.getValue()) {
      this.auth.getUserEmail();
    }
  }

}
