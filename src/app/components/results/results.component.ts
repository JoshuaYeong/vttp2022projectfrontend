import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Flat } from 'src/app/models';
import { AppCookieService } from 'src/app/services/app-cookie.service';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  username!: string
  query!: string
  limit!: number
  flatArr: Flat[] = []
  sub$!: Subscription
  parentSelector: boolean = false
  favouritesArray: Flat[] = []
  favArray = []

  constructor(private activatedRoute: ActivatedRoute, private searchSvc: SearchService, private appCookieSvc: AppCookieService, private jwtTokenSvc: JwtTokenService, private router: Router) { }

  ngOnInit(): void {
    let expired = this.jwtTokenSvc.isTokenExpired()
    // console.log("isTokenExpired: ", expired)

    // this.sub$ = this.activatedRoute.paramMap.subscribe((param) => {
    //   this.username = param.get('username')
    // })
    // this.activatedRoute.queryParamMap.subscribe((params) => {
    //   this.query = params.get('query')
    //   this.limit = Number(params.get('limit'))
    // })
    // //@ts-ignore
    // this.searchSvc.getResults(this.username, this.query, this.limit).subscribe(res => this.flatArr = res)

    this.username = this.activatedRoute.snapshot.params['username']
    this.query = this.activatedRoute.snapshot.params['query']
    this.limit = this.activatedRoute.snapshot.params['limit']
    this.sub$ = this.activatedRoute.params.subscribe(data => {
      this.searchSvc.getResults(this.username, this.query, this.limit).then(res => this.flatArr = res)
    })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }

  onChange($event: any, f: Flat) {
    if ($event.target.checked) {
      this.favouritesArray.push(f)
    } else {
      let i: number = 0
      this.favouritesArray.forEach((e: any) => {
        if (e == f) {
          this.favouritesArray.splice(i)
          return
        }
        i++
      })
    }

    console.log(':::::favouritesArray: ', this.favouritesArray)
  }

  toProfilePage() {
    // this.username = this.appCookieSvc.get("username")
    // console.log("Username: ", this.username)
    console.log(':::::toProfilePage() Called')
    this.router.navigate([`/profile/${ this.username }`])
  }

  saveToFavourites() {

    console.log(':::::saveToFavourite() Called')

    this.searchSvc.doSave(this.username, this.favouritesArray)
      .then(res => {
        window.location.reload()
        this.router.navigate([`/favourites/${ this.username }`])
      })

  }

}
