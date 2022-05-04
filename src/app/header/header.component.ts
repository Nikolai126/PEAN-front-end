import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogin = this.auth.isAuthenticated();
  email: string;

  constructor(private auth: AuthService) {

  }

  ngOnInit(): void {
    if (this.isLogin) {
      this.auth.getUserEmail().subscribe({
        next: value => {
          this.email = value;
        },
        error: err => {
          this.auth.error = err.error.message;
        }
      })
    }
  }


  onLogout(): void {
    this.auth.logout();
    location.reload();
  }

}
