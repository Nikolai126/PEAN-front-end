import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import Validation from '../utils/validation-sign-up'
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {regUser} from "../shared/interfaces";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  form: FormGroup;
  email: string;
  error = '';

  successfully = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [true, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const user: regUser = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password
    }

    this.auth.signUp(user).subscribe({
    next: response => {
      this.submitted = false;
      this.successfully = true;
      this.onReset();
      this.auth.setToken(response);
      this.auth.getUserEmail();
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    },
      error: err => {
        this.submitted = false;
        this.error = err.error.message;
      }
    });
  }

  onReset(): void {
    if (!this.form.invalid) {
      this.form.reset();
      this.submitted = false;
    }
  }

}
