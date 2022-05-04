import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {authUser} from "../shared/interfaces";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
// import {GoogleAuthService} from "../services/google-auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  error: string | object | null;

  submitted = false;
  success = false;

  user: any;
  // user: gapi.auth2.GoogleUser;

  constructor(
    private auth: AuthService,
    private router: Router,
    // private googleService: GoogleAuthService
  ) { }

  ngOnInit(): void {
    // this.googleService.observable().subscribe(user => {
    //   this.user = user;
    //
    //   console.log('user:', this.user.getBasicProfile().getFamilyName());
    // });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  // signIn() {
  //   this.googleService.signIn();
  // }
  //
  // signOut() {
  //   this.googleService.signOut();
  // }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: authUser = {
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password
    }

    this.auth.login(user).subscribe({
      next: response => {
        this.error = null;
        this.submitted = false;
        this.success = true;
        this.onReset();
        this.auth.setToken(response);
        this.auth.getUserEmail();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: err => {
        this.submitted = false;
        this.error = err.error.message;
      }
    })
  }

  onReset(): void {
    if (!this.form.invalid) {
      this.form.reset();
      this.submitted = false;
    }
  }


}

