import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  email: string = '';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.isLogin = this.auth._isAuth$.getValue();
    this.email = this.auth.userEmail;
  }

  onLogout(): void {
    this.auth.logout();
  }

}
