import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { SignInService } from 'src/app/services/signin.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { Search } from 'src/app/models';
import { AppCookieService } from 'src/app/services/app-cookie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isSignedIn = false
  currentUser: any
  // username!: string
  form!: FormGroup
  query!: string
  limit!: Number
  token!: string

  public selected = '5'

  constructor(private signInSvc: SignInService, private jwtTokenSvc: JwtTokenService, private appCookieSvc: AppCookieService, private fb: FormBuilder, private router: Router, private searchSvc: SearchService) { }

  ngOnInit(): void {
    this.isSignedIn = this.signInSvc.isSignedIn()

    if (this.isSignedIn) {
      // this.token = this.appCookieSvc.get("token",)
      // console.log("::::::token: ", this.token)

      this.currentUser = this.appCookieSvc.get("username")
      console.log("Username: ", this.currentUser)

      let expired = this.jwtTokenSvc.isTokenExpired()
      console.log("isTokenExpired: ", expired)

      this.form = this.createForm()
    }
  }

  createForm() {
    return this.fb.group({
      query: this.fb.control<string>("", [Validators.required]),
      limit: this.fb.control<number>(5)
    })
  }

  onSubmit() {
    // this.username = this.currentUser.username
    const data = this.form.value as Search
    console.log(':::::Data: ', data)

    this.searchSvc.getResults(this.currentUser, data.query, data.limit)
      .then(result => {
        console.log(':::::getResults() Called')
        this.router.navigate([`/results/${ this.currentUser }`, data.query, data.limit])
      }).catch(error => {
        console.error(':::::Search Comp Error: ', error)
      })
  }

  toFavourites() {
    // this.username = this.currentUser.username
    console.log(':::::toFavourites() Called')
    this.router.navigate([`/favourites/${ this.currentUser }`])
  }

  signOut(): void {
    this.signInSvc.doSignOut()
  }

  toResults() {
    let token2 = this.appCookieSvc.get("token",)
    console.log("::::::before toResults token: ", token2)
    console.log(':::::toResults() Called')
    this.router.navigate([`/results/${ this.currentUser }`])
  }

}
