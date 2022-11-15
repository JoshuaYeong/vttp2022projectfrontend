import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/signin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private signInSvc: SignInService) { }

  ngOnInit(): void {
    this.signInSvc.doSignOut()
  }

}
