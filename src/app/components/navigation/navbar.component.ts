import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppCookieService } from 'src/app/services/app-cookie.service';
import { SignInService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  isSignedIn = false
  currentUser: any

  constructor(private signInSvc: SignInService, private appCookieSvc: AppCookieService) { }

  ngOnInit(): void {
    this.isSignedIn = this.signInSvc.isSignedIn()
    if (this.isSignedIn) {
      this.currentUser = this.appCookieSvc.get("username")
    }
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  reload(): void {
    window.location.reload()
  }

  signOut(): void {
    this.signInSvc.doSignOut()
    // window.location.reload()
  }

}
