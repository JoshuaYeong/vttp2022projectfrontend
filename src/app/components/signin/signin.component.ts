import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { JwtResponse, User } from 'src/app/models';
import { AppCookieService } from 'src/app/services/app-cookie.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { SignInService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  form!: FormGroup
  isSignedIn = false;
  signedInFailed = false;
  errorMessage = "";

  constructor(private fb: FormBuilder, private router: Router, private signInSvc: SignInService, private jwtTokenSvc: JwtTokenService, private appCookieSvc: AppCookieService) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm() {
    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', Validators.required)
    })
  }

  onSubmit() {
    const data = this.form.value as User
    // console.log(':::::User: ', data)

    this.signInSvc.signin(data)
      .then((result: JwtResponse) => {
        this.signedInFailed = false
        this.isSignedIn = true

        this.appCookieSvc.set("username", result.username)
        this.appCookieSvc.set("token", result.token)
        // console.log(':::::App Cookie Token: ', result.token)

        // this.signInSvc.getProfile(result.username)

        this.signInSvc.doSignin()
          .then(res => {
            this.router.navigate([`/profile/${ result.username }`])
          })
      }).catch(err => {
        this.errorMessage = err.message
        this.signedInFailed = true
      })
  }

}
