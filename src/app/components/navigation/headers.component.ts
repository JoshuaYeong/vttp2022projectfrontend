import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppCookieService } from 'src/app/services/app-cookie.service';
import { SignInService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  isSignedIn = false
  currentUser: any
  sub$!: Subscription

  constructor(private signInSvc: SignInService, private appCookieSvc: AppCookieService) { }

  ngOnInit(): void {
    this.isSignedIn = this.signInSvc.isSignedIn()
    if (this.isSignedIn) {
      this.currentUser = this.appCookieSvc.get("username")
    }

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  signOut(): void {
    this.signInSvc.doSignOut()
    window.location.reload()
  }

}
